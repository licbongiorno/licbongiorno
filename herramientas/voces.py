#!/usr/bin/env python3
"""Administración de «Voces que nos habitan» (sitio estático: los datos son archivos JSON en contenido/voces/).

  python3 herramientas/voces.py informe
      Cuántas citas hay por autor: verificadas, publicadas, ocultas, pendientes.

  python3 herramientas/voces.py agregar AUTOR --fuente ID --original "texto literal" --traduccion "..." --temas a,b,c [--nota "..."] [--fragmento]
      Agrega una cita. Antes de guardarla busca el texto literal en la fuente descargada: si no aparece, no la guarda.
      AUTOR es el slug (seneca, sigmund-freud…). La cita queda publicada y verificada, con su ubicación calculada.

  python3 herramientas/voces.py publicar ID     /   despublicar ID
      Muestra u oculta una cita en el sitio sin borrarla.

  python3 herramientas/voces.py editar ID --traduccion "..." [--temas a,b] [--nota "..."]
      Corrige la traducción, los temas o la nota (el original no se edita: para eso, eliminar y volver a agregar).

  python3 herramientas/voces.py eliminar ID
      Borra una cita definitivamente.

  python3 herramientas/voces.py incorporar AUTOR
      Pasa un autor de «pendiente» a «incorporado». Antes hay que completar su ficha en contenido/voces/autores.json.

Después de cualquier cambio: python3 build.py && python3 validar.py
Para sumar una obra nueva como fuente: agregarla a contenido/voces/fuentes.json y correr herramientas/fuentes_voces.py ID.
"""
import argparse
import json
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import verificar_voces as VV  # noqa: E402

DIR = VV.VOCES


def leer(autor):
    p = DIR / "citas" / f"{autor}.json"
    return p, (json.loads(p.read_text(encoding="utf-8")) if p.exists() else [])


def guardar(p, citas):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(citas, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


def buscar_id(cid):
    for p in sorted((DIR / "citas").glob("*.json")):
        citas = json.loads(p.read_text(encoding="utf-8"))
        for c in citas:
            if c["id"] == cid:
                return p, citas, c
    sys.exit(f"No existe la cita {cid}")


def informe(_):
    reg = json.loads((DIR / "autores.json").read_text(encoding="utf-8"))
    print(f"{'Autor':28} {'total':>6} {'verif.':>7} {'publ.':>6} {'ocultas':>8}")
    for a in reg["autores"]:
        if a.get("estado") != "incorporado":
            continue
        _, citas = leer(a["slug"])
        v = sum(1 for c in citas if c.get("verificada"))
        pub = sum(1 for c in citas if c.get("verificada") and c.get("publicada"))
        print(f"{a['nombre']:28} {len(citas):>6} {v:>7} {pub:>6} {len(citas) - pub:>8}" + ("" if pub >= 50 else "   ← menos de 50"))
    print(f"\nAutores pendientes: {sum(1 for a in reg['autores'] if a.get('estado') != 'incorporado')}")


def agregar(args):
    if args.fuente not in VV.FUENTES:
        sys.exit(f"Fuente desconocida: {args.fuente}. Agregala a contenido/voces/fuentes.json.")
    if not (VV.CACHE / f"{args.fuente}.txt").exists():
        sys.exit(f"Falta descargar la fuente: python3 herramientas/fuentes_voces.py {args.fuente}")
    r = VV.buscar(args.fuente, args.original)
    if not r:
        sys.exit("El texto no aparece literalmente en la fuente. No se guardó. (Revisá comillas, cortes o la edición.)")
    p, citas = leer(args.autor)
    clave = VV.preparar(args.original)[0]
    if any(VV.preparar(c["original"])[0] == clave for c in citas):
        sys.exit("Esa cita ya está en la colección.")
    n = max([int(c["id"].rsplit("-", 1)[1]) for c in citas] + [0]) + 1
    crudo = VV.fuente(args.fuente)[0]
    ubic, url = VV.ubicar(args.fuente, crudo, r[0])
    c = {"id": f"{args.autor}-{n:03d}", "fuente": args.fuente, "original": args.original, "traduccion": args.traduccion,
         "temas": [t.strip() for t in args.temas.split(",") if t.strip()], "publicada": True, "incorporada": date.today().isoformat(),
         "verificada": True, "ubicacion": ubic, "url": url}
    if args.nota:
        c["nota"] = args.nota
    if args.fragmento:
        c["fragmento"] = True
    citas.append(c)
    guardar(p, citas)
    print(f"Guardada {c['id']} · {ubic}")


def publicar(args, valor=True):
    p, citas, c = buscar_id(args.id)
    if valor and not c.get("verificada"):
        sys.exit("No se puede publicar una cita sin verificar. Corré herramientas/verificar_voces.py.")
    c["publicada"] = valor
    guardar(p, citas)
    print(f"{args.id}: {'publicada' if valor else 'oculta'}")


def editar(args):
    p, citas, c = buscar_id(args.id)
    if args.traduccion:
        c["traduccion"] = args.traduccion
    if args.temas:
        c["temas"] = [t.strip() for t in args.temas.split(",") if t.strip()]
    if args.nota is not None:
        c["nota"] = args.nota
    guardar(p, citas)
    print(f"{args.id}: actualizada")


def eliminar(args):
    p, citas, c = buscar_id(args.id)
    guardar(p, [x for x in citas if x is not c])
    print(f"{args.id}: eliminada")


def incorporar(args):
    pr = DIR / "autores.json"
    reg = json.loads(pr.read_text(encoding="utf-8"))
    a = next((x for x in reg["autores"] if x["slug"] == args.autor), None)
    if not a:
        sys.exit("Ese autor no está en el registro. Agregalo primero a contenido/mapa_autores.json y corré herramientas/gen_registro_voces.py.")
    faltan = [k for k in ("nombre", "nombre_completo", "bio", "disciplinas", "obras", "relacion", "nacimiento", "muerte", "nacionalidad") if not a.get(k)]
    if faltan:
        sys.exit("Completá la ficha antes de incorporarlo. Faltan: " + ", ".join(faltan))
    a["estado"] = "incorporado"
    a.setdefault("incorporado", date.today().isoformat())
    a.pop("motivo", None)
    pr.write_text(json.dumps(reg, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{args.autor}: incorporado")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("informe").set_defaults(f=informe)
    s = sub.add_parser("agregar")
    s.add_argument("autor"); s.add_argument("--fuente", required=True); s.add_argument("--original", required=True)
    s.add_argument("--traduccion", required=True); s.add_argument("--temas", required=True); s.add_argument("--nota")
    s.add_argument("--fragmento", action="store_true"); s.set_defaults(f=agregar)
    for nombre, val in (("publicar", True), ("despublicar", False)):
        s = sub.add_parser(nombre); s.add_argument("id"); s.set_defaults(f=lambda a, v=val: publicar(a, v))
    s = sub.add_parser("editar"); s.add_argument("id"); s.add_argument("--traduccion"); s.add_argument("--temas"); s.add_argument("--nota")
    s.set_defaults(f=editar)
    s = sub.add_parser("eliminar"); s.add_argument("id"); s.set_defaults(f=eliminar)
    s = sub.add_parser("incorporar"); s.add_argument("autor"); s.set_defaults(f=incorporar)
    args = ap.parse_args()
    args.f(args)


if __name__ == "__main__":
    main()
