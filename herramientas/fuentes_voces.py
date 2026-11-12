#!/usr/bin/env python3
"""Descarga y normaliza las fuentes de dominio público usadas por «Voces que nos habitan».

Uso:
  python3 herramientas/fuentes_voces.py            # descarga todas las fuentes declaradas en contenido/voces/fuentes.json
  python3 herramientas/fuentes_voces.py ID         # solo una fuente

Las fuentes se guardan en herramientas/.cache-voces/ (no se suben al repositorio) como texto plano normalizado.
herramientas/verificar_voces.py usa ese texto para comprobar que cada cita figura literalmente en su fuente.
"""
import html
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CACHE = RAIZ / "herramientas/.cache-voces"
FUENTES = json.loads((RAIZ / "contenido/voces/fuentes.json").read_text(encoding="utf-8"))


def bajar(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (verificador de citas)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        datos = r.read()
        tipo = r.headers.get_content_charset() or "utf-8"
    try:
        return datos.decode(tipo)
    except (LookupError, UnicodeDecodeError):
        return datos.decode("latin-1")


def a_texto(crudo):
    crudo = re.sub(r"(?is)<(script|style|nav|header|footer)[^>]*>.*?</\1>", " ", crudo)
    crudo = re.sub(r"(?i)<br\s*/?>|</p>|</h\d>|</div>|</li>", "\n", crudo)
    crudo = re.sub(r"<[^>]+>", " ", crudo)
    return html.unescape(crudo)


def normalizar(t):
    """Normalización usada tanto para la fuente como para las citas: comillas, guiones y espacios."""
    t = t.replace("­", "").replace(" ", " ")
    t = re.sub(r"[‘’‚′´`]", "'", t)
    t = re.sub(r"[“”„«»″]", '"', t)
    t = re.sub(r"[–—]", "-", t)
    t = re.sub(r"-\s*\n\s*(?=[a-zäöüß])", "", t)  # palabras cortadas al final de línea
    return re.sub(r"\s+", " ", t).strip()


def descargar(fid, f):
    partes = []
    if f.get("capitulos"):
        # Libros de projekt-gutenberg.org repartidos en capítulos numerados.
        base = f["url"].rstrip("/")
        total = f["capitulos"]
        if total == "auto":
            nums = [int(x) for x in re.findall(r"/chapter/(\d+)", bajar(base + "/"))]
            total = max(nums) if nums else 1
        for n in range(1, total + 1):
            try:
                partes.append(f"\n[[SECCION {n}]]\n" + a_texto(bajar(f"{base}/chapter/{n}")))
            except Exception as e:  # noqa: BLE001
                print(f"  capítulo {n}: {e}")
            time.sleep(0.4)
    else:
        for i, u in enumerate(f.get("urls", [f.get("url")]), 1):
            partes.append(f"\n[[SECCION {i}]]\n" + (a_texto(bajar(u)) if not u.endswith(".txt") else bajar(u)))
            time.sleep(0.4)
    texto = normalizar("\n".join(partes))
    CACHE.mkdir(exist_ok=True)
    (CACHE / f"{fid}.txt").write_text(texto, encoding="utf-8")
    print(f"{fid}: {len(texto):,} caracteres")


if __name__ == "__main__":
    ids = sys.argv[1:] or list(FUENTES)
    for fid in ids:
        descargar(fid, FUENTES[fid])
