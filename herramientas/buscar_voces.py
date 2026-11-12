#!/usr/bin/env python3
"""Busca fragmentos (expresiones regulares, sin distinguir mayúsculas) en las fuentes descargadas y muestra el contexto.
Uso: python3 herramientas/buscar_voces.py PREFIJO_DE_FUENTE "regex" ["regex" ...]  (o con -f archivo, un patrón por línea)
Opción: --ancho N (por defecto 160)."""
import re, sys
from pathlib import Path
CACHE = Path(__file__).resolve().parent / ".cache-voces"
args = sys.argv[1:]
ancho = 160
if "--ancho" in args:
    i = args.index("--ancho"); ancho = int(args[i + 1]); del args[i:i + 2]
pref, pats = args[0], args[1:]
if pats and pats[0] == "-f":
    pats = [l.strip() for l in Path(pats[1]).read_text(encoding="utf-8").splitlines() if l.strip()]
textos = {f.stem: f.read_text(encoding="utf-8") for f in sorted(CACHE.glob(pref + "*.txt"))}
for pat in pats:
    hall = 0
    for nombre, t in textos.items():
        for m in list(re.finditer(pat, t, re.I))[:2]:
            sec = re.findall(r"\[\[SECCION (\d+)\]\]", t[:m.start()])
            print(f"[{pat}] {nombre} §{sec[-1] if sec else '?'} :: …{t[max(0, m.start() - ancho):m.end() + ancho]}…")
            hall += 1
    if not hall:
        print(f"[{pat}] NO ENCONTRADO")
