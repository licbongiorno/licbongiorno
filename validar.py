#!/usr/bin/env python3
"""Control de calidad del sitio generado (public/). Sin dependencias.

Uso: python3 validar.py   → sale con código 1 si hay errores.

Verifica en cada página: title (30–65 caracteres), meta description (70–165), canonical absoluto,
un único H1, lang, Open Graph, JSON-LD válido (sin Review/AggregateRating), enlaces internos
existentes, imágenes con alt, enlaces externos con rel="noopener", coherencia FAQ visible = JSON-LD,
y que sitemap.xml solo contenga páginas indexables existentes.
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
PUB = RAIZ / "public"
C = json.loads((RAIZ / "sitio.json").read_text(encoding="utf-8"))
URL = C["url"].rstrip("/")
errores, avisos = [], []


class Analizador(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.titulo = ""
        self._en_titulo = False
        self.meta = {}
        self.links = []
        self.imgs = []
        self.jsonld = []
        self._en_ld = False
        self._buf = ""
        self.lang = None
        self.canon = None
        self.ids = set()
        self.summaries = []
        self._en_summary = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "h1":
            self.h1 += 1
        elif tag == "title" and not self.titulo:
            self._en_titulo = True
        elif tag == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k] = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canon = a.get("href")
        elif tag == "a" and "href" in a:
            self.links.append(a)
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._en_ld, self._buf = True, ""
        elif tag == "summary" and "indice-articulo__titulo" not in (a.get("class") or ""):
            self._en_summary, self._buf_s = True, ""

    def handle_endtag(self, tag):
        if tag == "title":
            self._en_titulo = False
        elif tag == "script" and self._en_ld:
            self._en_ld = False
            self.jsonld.append(self._buf)
        elif tag == "summary" and self._en_summary:
            self._en_summary = False
            self.summaries.append(self._buf_s.strip())

    def handle_data(self, d):
        if self._en_titulo:
            self.titulo += d
        if self._en_ld:
            self._buf += d
        if self._en_summary:
            self._buf_s += d


def existe(ruta):
    ruta = ruta.split("#")[0].split("?")[0]
    if not ruta or ruta == "/":
        return (PUB / "index.html").exists()
    p = PUB / ruta.lstrip("/")
    return p.is_file() or (p / "index.html").is_file()


def tipos(nodo, acc):
    if isinstance(nodo, dict):
        t = nodo.get("@type")
        if t:
            acc.extend(t if isinstance(t, list) else [t])
        for v in nodo.values():
            tipos(v, acc)
    elif isinstance(nodo, list):
        for v in nodo:
            tipos(v, acc)


paginas = sorted(PUB.rglob("*.html"))
for f in paginas:
    rel = "/" + str(f.relative_to(PUB)).replace("index.html", "")
    a = Analizador()
    a.feed(f.read_text(encoding="utf-8"))
    noindex = "noindex" in a.meta.get("robots", "")
    pref = f"{rel}:"
    if a.h1 != 1:
        errores.append(f"{pref} {a.h1} H1 (debe haber 1)")
    if a.lang != C["idioma"]:
        errores.append(f"{pref} lang={a.lang}")
    if not (30 <= len(a.titulo) <= 65):
        avisos.append(f"{pref} title de {len(a.titulo)} caracteres: {a.titulo}")
    d = a.meta.get("description", "")
    if not (70 <= len(d) <= 160):
        avisos.append(f"{pref} description de {len(d)} caracteres")
    if f.name != "404.html":
        if not a.canon or not a.canon.startswith(URL):
            errores.append(f"{pref} canonical ausente o incorrecto: {a.canon}")
        elif a.canon != URL + rel:
            errores.append(f"{pref} canonical {a.canon} no coincide con la ruta")
    for k in ("og:title", "og:description", "og:image", "og:url"):
        if k not in a.meta:
            errores.append(f"{pref} falta {k}")
    og = a.meta.get("og:image", "").replace(URL, "")
    if og and not existe(og):
        errores.append(f"{pref} og:image inexistente {og}")
    todos_tipos = []
    for bloque in a.jsonld:
        try:
            datos = json.loads(bloque)
            tipos(datos, todos_tipos)
        except json.JSONDecodeError as e:
            errores.append(f"{pref} JSON-LD inválido: {e}")
    if {"Review", "AggregateRating"} & set(todos_tipos):
        errores.append(f"{pref} contiene Review/AggregateRating (no permitido)")
    if "FAQPage" in todos_tipos:
        preguntas = []
        for bloque in a.jsonld:
            for n in json.loads(bloque).get("@graph", []):
                if n.get("@type") == "FAQPage":
                    preguntas = [q["name"] for q in n["mainEntity"]]
        if sorted(preguntas) != sorted(a.summaries):
            errores.append(f"{pref} FAQ en JSON-LD no coincide con las preguntas visibles")
    for l in a.links:
        h = l["href"]
        if h.startswith("/") and not h.startswith("//"):
            if not existe(h):
                errores.append(f"{pref} enlace interno roto {h}")
            frag = h.split("#")[1] if "#" in h else None
            if frag and h.split("#")[0] in ("", rel) and frag not in a.ids:
                errores.append(f"{pref} ancla inexistente #{frag}")
        elif h.startswith("#") and len(h) > 1 and h[1:] not in a.ids:
            errores.append(f"{pref} ancla inexistente {h}")
        elif h.startswith("http") and l.get("target") == "_blank" and "noopener" not in l.get("rel", ""):
            errores.append(f"{pref} enlace externo sin noopener {h}")
    for i in a.imgs:
        if "alt" not in i:
            errores.append(f"{pref} imagen sin alt {i.get('src')}")
    texto = f.read_text(encoding="utf-8")
    if re.search(r"\{\{|\}\}", texto.replace("{{", "", 0)) and "{{" in texto:
        errores.append(f"{pref} quedó un marcador {{{{...}}}} sin reemplazar")
    for prohibido in ("lorem", "TODO", "XXXX"):
        if prohibido in texto:
            errores.append(f"{pref} contiene «{prohibido}»")

# sitemap
sm = (PUB / "sitemap.xml").read_text(encoding="utf-8")
for loc in re.findall(r"<loc>(.*?)</loc>", sm):
    ruta = loc.replace(URL, "")
    if not existe(ruta):
        errores.append(f"sitemap: {loc} no existe")
    else:
        destino = PUB / ruta.lstrip("/") / "index.html" if ruta != "/" else PUB / "index.html"
        if "noindex" in destino.read_text(encoding="utf-8")[:3000]:
            errores.append(f"sitemap: {loc} está marcada noindex")

for a in avisos:
    print("AVISO ", a)
for e in errores:
    print("ERROR ", e)
print(f"\n{len(paginas)} páginas revisadas · {len(errores)} errores · {len(avisos)} avisos")
sys.exit(1 if errores else 0)
