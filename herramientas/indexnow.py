#!/usr/bin/env python3
"""Avisa a Bing (y a otros buscadores que usan IndexNow) de todas las URL del sitemap.

El buscador de ChatGPT usa el índice de Bing: avisar de cada cambio acelera que aparezcan las páginas nuevas.
Uso: python3 herramientas/indexnow.py   (lo ejecuta GitHub Actions después de cada publicación en main)
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
cfg = json.loads((raiz / "sitio.json").read_text(encoding="utf-8"))
clave = cfg.get("indexnow_key")
if not clave:
    sys.exit("Sin indexnow_key en sitio.json")
url = cfg["url"].rstrip("/")
host = url.split("://", 1)[1]
urls = re.findall(r"<loc>(.*?)</loc>", (raiz / "public" / "sitemap.xml").read_text(encoding="utf-8"))
datos = json.dumps({"host": host, "key": clave, "keyLocation": f"{url}/{clave}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=datos,
                             headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print(f"IndexNow: {r.status} · {len(urls)} URL enviadas")
except urllib.error.HTTPError as e:
    print(f"IndexNow respondió {e.code}: {e.read()[:200]!r}")
    sys.exit(0 if e.code in (200, 202) else 1)
