#!/usr/bin/env python3
"""Verifica las citas de «Voces que nos habitan» contra sus fuentes primarias de dominio público.

Uso:
  python3 herramientas/fuentes_voces.py        # 1) descarga las fuentes (una vez)
  python3 herramientas/verificar_voces.py      # 2) verifica, completa ubicaciones y escribe el informe

Para cada cita de contenido/voces/citas/<autor>.json:
  - busca el texto «original» en la fuente declarada (comparación normalizada: comillas, guiones, espacios,
    mayúsculas, números de página sueltos, marcas de cursiva; u/v en latín);
  - si lo encuentra, guarda "verificada": true y la ubicación calculada (carta y parágrafo, libro y sección,
    capítulo…) y el enlace a la fuente;
  - si no lo encuentra, marca "verificada": false y lo informa. Una cita no verificada nunca se publica
    (build.py y validar.py la excluyen).
Al terminar escribe docs/14-INFORME-VOCES.md.
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CACHE = RAIZ / "herramientas/.cache-voces"
VOCES = RAIZ / "contenido/voces"
FUENTES = json.loads((VOCES / "fuentes.json").read_text(encoding="utf-8"))

ROMANOS = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}


def romano(s):
    total = 0
    for i, c in enumerate(s):
        v = ROMANOS[c]
        total += -v if i + 1 < len(s) and ROMANOS[s[i + 1]] > v else v
    return total


def preparar(t, latin=False):
    """Devuelve (texto normalizado, posiciones en el original) para comparar sin perder la ubicación."""
    t = re.sub(r"[‘’‚′´`]", "'", t)
    t = re.sub(r"[“”„«»″]", '"', t)
    t = re.sub(r"[–—]", "-", t)
    # Números sueltos (páginas, parágrafos) y marcas [n] o [A]: se reemplazan por espacios del mismo largo.
    t = re.sub(r"\[\w{1,3}\]|(?<![\w.,])\d{1,3}(?![\w])", lambda m: " " * len(m.group()), t)
    norm, pos = [], []
    for i, c in enumerate(t):
        if c in "_*+[]":
            continue
        if c.isspace():
            continue  # se ignoran los espacios: algunas fuentes unen palabras al cortar líneas
        c = c.lower()
        if latin:
            c = {"v": "u", "j": "i"}.get(c, c)
        norm.append(c)
        pos.append(i)
    return "".join(norm), pos


_cache = {}


def fuente(fid):
    if fid not in _cache:
        crudo = (CACHE / f"{fid}.txt").read_text(encoding="utf-8")
        latin = FUENTES[fid].get("idioma") == "la"
        _cache[fid] = (crudo, *preparar(crudo, latin), latin)
    return _cache[fid]


def ultimo(patron, texto, hasta, desde=0):
    """Última coincidencia de patron entre desde y hasta (posiciones absolutas; mira 3 caracteres más allá)."""
    m = None
    for m_ in re.compile(patron).finditer(texto, desde, hasta + 3):
        if m_.start() <= hasta:
            m = m_
    return m


def ubicar(fid, crudo, i):
    """Ubicación legible de la posición i en la fuente fid."""
    f = FUENTES[fid]
    tipo = f.get("localizador", "")
    sec = ultimo(r"\[\[SECCION (\d+)\]\]", crudo, i)
    nsec = int(sec.group(1)) if sec else 1
    url = f.get("url")
    if "urls" in f:
        url = f["urls"][nsec - 1]
    if tipo == "epistula":
        carta = ultimo(r"([IVXLC]+)\. SENECA LUCILIO SUO SALUTEM", crudo, i)
        par = ultimo(r"\[(\d+)\]", crudo, i, carta.end() if carta else 0)
        return f"Carta {romano(carta.group(1))}, {par.group(1) if par else 1}", url
    if tipo == "tratado":
        desde = sec.end() if sec else 0
        cap = ultimo(r"\b([IVXL]+)\.?\s+[1I]\.?\s", crudo, i, desde)
        ncap = romano(cap.group(1)) if cap else 1
        par = ultimo(r"\s(\d{1,2})\.?\s", crudo, i, cap.end() - 2 if cap else desde)
        libro = f"Libro {nsec}, " if len(f.get("urls", [])) > 1 else ""
        return f"{libro}{ncap}, {par.group(1) if par else 1}", url
    if tipo == "meditaciones":
        libro = ultimo(r" ([IVX]{1,4})\. (?=[A-Z])", crudo, i, f.get("inicio_texto", 0))
        nsecc = ultimo(r"(?<=[\s\]])(\d{1,2})\. (?=[A-Z\[])", crudo, i, libro.end() if libro else 0)
        return f"Libro {romano(libro.group(1)) if libro else 1}, {nsecc.group(1) if nsecc else 1}", url
    if tipo == "capitulo-romano":
        cap = ultimo(r"\b(CHAPTER|LECTURE|Lecture) ([IVXLC]+)\b", crudo, i)
        if cap:
            nombre = "Capítulo" if cap.group(1) == "CHAPTER" else "Conferencia"
            return f"{nombre} {romano(cap.group(2))}", url
        return "", url
    if tipo == "titulos":
        # Libros de ensayos o charlas: el último título (en mayúsculas) que aparece antes de la cita.
        mejor = max(((crudo.rfind(tt, 0, i), tt) for tt in f["titulos"]), default=(-1, ""))
        return (f"«{mejor[1].title()}»" if mejor[0] >= 0 else ""), url
    if f.get("capitulos"):
        return f"Capítulo {nsec}", f"{f['url'].rstrip('/')}/chapter/{nsec}"
    return "", url


def buscar(fid, original):
    crudo, norm, pos, latin = fuente(fid)
    aguja, _ = preparar(original, latin)
    aguja = aguja.strip()
    candidatos = [m.start() for m in re.finditer(re.escape(aguja), norm)]
    if not candidatos:
        return None
    # Si la frase aparece también en una introducción, preferir la del cuerpo del texto.
    inicio = FUENTES[fid].get("inicio_texto", 0)
    elegidos = [c for c in candidatos if pos[c] >= inicio] or candidatos
    return pos[elegidos[0]], len(candidatos)


def verificar():
    resultados = {}
    for archivo in sorted((VOCES / "citas").glob("*.json")):
        autor = archivo.stem
        citas = json.loads(archivo.read_text(encoding="utf-8"))
        ok, fallas = 0, []
        for c in citas:
            if c.get("tipo") in ("dudosa", "parafrasis"):
                c["verificada"] = False
                continue
            r = buscar(c["fuente"], c["original"]) if (CACHE / f"{c['fuente']}.txt").exists() else None
            if r:
                crudo = fuente(c["fuente"])[0]
                c["ubicacion"], c["url"] = ubicar(c["fuente"], crudo, r[0])
                c["verificada"] = True
                ok += 1
            else:
                c["verificada"] = False
                fallas.append(c["id"])
        archivo.write_text(json.dumps(citas, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        resultados[autor] = (ok, len(citas), fallas)
        print(f"{autor}: {ok}/{len(citas)} verificadas" + (f" · NO ENCONTRADAS: {', '.join(fallas)}" if fallas else ""))
    return resultados


def informe(resultados):
    autores = json.loads((VOCES / "autores.json").read_text(encoding="utf-8"))
    mapa = {a["slug"]: a for a in json.loads((RAIZ / "contenido/mapa_autores.json").read_text(encoding="utf-8"))["autores"]}
    lineas = [
        "# «Voces que nos habitan» — informe de verificación",
        "",
        f"Generado por `herramientas/verificar_voces.py` el {date.today().isoformat()}. No editar a mano.",
        "",
        "## Autores incorporados",
        "",
        "| Autor | Citas verificadas | Publicadas | Fuentes | Estado |",
        "|---|---|---|---|---|",
    ]
    for a in autores["autores"]:
        if a.get("estado") != "incorporado":
            continue
        citas = json.loads((VOCES / f"citas/{a['slug']}.json").read_text(encoding="utf-8"))
        ver = sum(1 for c in citas if c.get("verificada"))
        pub = sum(1 for c in citas if c.get("verificada") and c.get("publicada"))
        fuentes = sorted({c["fuente"] for c in citas})
        estado = "completo (≥ 50)" if ver >= 50 else f"incompleto: faltan {50 - ver}"
        lineas.append(f"| {a['nombre']} | {ver} | {pub} | {len(fuentes)} | {estado} |")
    lineas += ["", "## Citas no verificadas", ""]
    sin = [(au, f) for au, (_, _, fs) in resultados.items() for f in fs]
    lineas += [f"- `{f}` ({au}): el texto no aparece en la fuente declarada. No se publica." for au, f in sin] or ["Ninguna."]
    lineas += ["", "## Frases descartadas (atribuciones dudosas o paráfrasis)", ""]
    for d in autores.get("descartadas", []):
        lineas.append(f"- **{d['autor']}** — «{d['frase']}»: {d['motivo']}")
    lineas += ["", "## Autores del sitio pendientes", "",
               "| Autor | Años | Motivo |", "|---|---|---|"]
    for a in autores["autores"]:
        if a.get("estado") == "incorporado":
            continue
        m = mapa.get(a["slug"], {})
        lineas.append(f"| {a.get('nombre') or m.get('corto', a['slug'])} | {m.get('anios', '')} | {a.get('motivo', '')} |")
    lineas += ["", "## Fuentes", ""]
    for fid, f in FUENTES.items():
        enlace = f.get("url") or f["urls"][0]
        lineas.append(f"- `{fid}` — *{f['titulo']}* ({f['anio']}), {f.get('edicion', '')} <{enlace}> — {f.get('dominio_publico', '')}")
    (RAIZ / "docs/14-INFORME-VOCES.md").write_text("\n".join(lineas) + "\n", encoding="utf-8")
    print("informe: docs/14-INFORME-VOCES.md")


if __name__ == "__main__":
    res = verificar()
    if (VOCES / "autores.json").exists():
        informe(res)
    sys.exit(1 if any(f for _, _, f in res.values()) else 0)
