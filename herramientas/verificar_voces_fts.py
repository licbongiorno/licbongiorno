#!/usr/bin/env python3
"""Verifica citas breves de autores con obra protegida (derecho de cita, art. 10 de la Ley 11.723).

Estas obras no se pueden descargar, así que la verificación usa el buscador de texto completo de
Internet Archive: la frase tiene que aparecer, literal, en un libro digitalizado cuyo autor y título
coinciden con la fuente declarada en contenido/voces/fuentes.json ("verificacion": "ia-fts").
Se guarda la evidencia (identificador del libro y fragmento encontrado) en cada cita.

Uso:
  python3 herramientas/verificar_voces_fts.py               # todas las citas de fuentes ia-fts sin verificar
  python3 herramientas/verificar_voces_fts.py --todas       # vuelve a verificar también las ya verificadas
  python3 herramientas/verificar_voces_fts.py autor-slug    # solo un autor
"""
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
VOCES = RAIZ / "contenido/voces"
API = "https://archive.org/services/search/beta/page_production/?service_backend=fts&hits_per_page=40&page_type=search_results&user_query="


def plano(t):
    """Minúsculas, sin acentos ni puntuación; conserva los apóstrofos dentro de las palabras (one's)."""
    t = re.sub(r"[’‘`´]", "'", t)
    t = re.sub(r"[\u2010-\u2015\u2212]", " ", t)
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    t = re.sub(r"[^a-z0-9']+", " ", t)
    return re.sub(r"(?<![a-z])'|'(?![a-z])", " ", t).strip()


def tramos(original):
    """Tramos de 10 palabras que se superponen en 3: si todos aparecen en el mismo libro, la frase es continua.
    Las omisiones marcadas con […] separan partes que se verifican por separado."""
    salida = []
    for parte in re.split(r"\[…\]|\[\.\.\.\]|\(…\)", original):
        p = plano(parte).split()
        if not p:
            continue
        if len(p) <= 12:
            salida.append(" ".join(p))
            continue
        i = 0
        while i < len(p):
            tramo = p[i:i + 10]
            if len(tramo) < 10:
                tramo = p[-10:]
            salida.append(" ".join(tramo))
            if i + 10 >= len(p):
                break
            i += 7
    return salida


def consultar(q, intentos=4):
    for n in range(intentos):
        try:
            req = urllib.request.Request(API + urllib.parse.quote(q), headers={"User-Agent": "voces-verificador/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                d = json.load(r)
            return d["response"]["body"]["hits"]["hits"]
        except Exception:
            time.sleep(4 * (n + 1))
    return None


def coincide(campo, claves):
    t = plano(" ".join(campo) if isinstance(campo, list) else (campo or ""))
    return all(k in t for k in claves)


def verificar_cita(c, f):
    """Devuelve la evidencia si todos los tramos de la frase aparecen en un mismo libro del autor con el título declarado."""
    autor_k = plano(f["ia_autor"]).split()
    titulo_k = plano(f["ia_titulo"]).split()
    candidatos, primero = None, None
    for t in tramos(c["original"]):
        hits = consultar(f'"{t}" AND creator:({f["ia_autor"]})')
        time.sleep(0.4)
        if hits is None:
            return None, "error de red"
        validos = {}
        for h in hits:
            fl = h.get("fields", {})
            if coincide(fl.get("creator", ""), autor_k) and coincide(fl.get("title", ""), titulo_k):
                validos[fl.get("identifier")] = h
        candidatos = set(validos) if candidatos is None else candidatos & set(validos)
        if primero is None:
            primero = validos
        if not candidatos:
            return None, f"el tramo «{t}» no aparece en {f['ia_autor']} · {f['ia_titulo']}"
    item = sorted(candidatos)[0]
    h = primero[item]
    fl = h["fields"]
    frag = re.sub(r"\{\{\{|\}\}\}", "", " … ".join(h.get("highlight", {}).get("text", [])[:2]))
    return {"item": item, "titulo": fl.get("title"), "anio": fl.get("year"), "fragmento": frag[:400]}, ""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    todas = "--todas" in sys.argv
    fuentes = json.loads((VOCES / "fuentes.json").read_text(encoding="utf-8"))
    archivos = [VOCES / "citas" / f"{a}.json" for a in args] if args else sorted((VOCES / "citas").glob("*.json"))
    for archivo in archivos:
        citas = json.loads(archivo.read_text(encoding="utf-8"))
        cambios = ok = total = 0
        fallas = []
        for c in citas:
            f = fuentes.get(c["fuente"], {})
            if f.get("verificacion") != "ia-fts":
                continue
            total += 1
            if c.get("verificada") and not todas:
                ok += 1
                continue
            ev, motivo = verificar_cita(c, f)
            time.sleep(0.6)
            if ev:
                c["verificada"], c["evidencia"] = True, ev
                c["url"] = f"https://archive.org/details/{ev['item']}"
                ok += 1
            else:
                c["verificada"] = False
                c.pop("evidencia", None)
                fallas.append((c["id"], motivo, c["original"][:70]))
            cambios += 1
        if total:
            if cambios:
                archivo.write_text(json.dumps(citas, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
            print(f"{archivo.stem}: {ok}/{total} verificadas")
            for i, m, t in fallas:
                print(f"   NO: {i} · {m} · {t}")


if __name__ == "__main__":
    main()
