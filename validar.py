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
        self._en_menu = 0
        self._en_summary = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "li" and "menu-movil__grupo" in (a.get("class") or ""):
            self._en_menu = 1  # los grupos del menú móvil usan <details>, no son preguntas frecuentes
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
        elif tag == "summary" and "indice-articulo__titulo" not in (a.get("class") or "") and not self._en_menu:
            self._en_summary, self._buf_s = True, ""

    def handle_endtag(self, tag):
        if tag == "details" and self._en_menu:
            self._en_menu = 0
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


paginas = sorted(f for f in PUB.rglob("*.html") if not f.name.startswith("yandex_"))  # archivos de verificación de webmaster, no son páginas
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

# PsicoQuiz: estructura del banco, respuestas válidas y enlaces reales
pq = json.loads((RAIZ / "contenido/psicoquiz.json").read_text(encoding="utf-8"))
cats_pq = {c["id"] for c in pq["categorias"]}
temas_pq = {t["id"] for t in pq["temas"]}
ids_pq, enunciados_pq = set(), set()
for q in pq["preguntas"]:
    pref = f"psicoquiz {q.get('id')}:"
    for k in ("id", "categoria", "nivel", "tipo", "enunciado", "explicacion", "fuente", "conceptos"):
        if not q.get(k):
            errores.append(f"{pref} falta «{k}»")
    if q["id"] in ids_pq:
        errores.append(f"{pref} id repetido")
    ids_pq.add(q["id"])
    if q["enunciado"] in enunciados_pq:
        errores.append(f"{pref} enunciado repetido")
    enunciados_pq.add(q["enunciado"])
    if q["categoria"] not in cats_pq:
        errores.append(f"{pref} categoría desconocida {q['categoria']}")
    if q["nivel"] not in (1, 2, 3, 4, 5):
        errores.append(f"{pref} nivel inválido")
    for t in q.get("temas", []):
        if t not in temas_pq:
            errores.append(f"{pref} tema desconocido {t}")
    for m in q.get("modos", []):
        if m not in ("quien", "error", "caso", "duelo"):
            errores.append(f"{pref} modo desconocido {m}")
    tipo, ops, c = q["tipo"], q.get("opciones", []), q.get("correcta")
    if tipo in ("unica", "completar", "vf"):
        if not isinstance(c, int) or not 0 <= c < len(ops) or len(ops) < 2:
            errores.append(f"{pref} respuesta correcta inválida")
    elif tipo == "multiple":
        if not isinstance(c, list) or len(c) < 2 or any(not 0 <= x < len(ops) for x in c):
            errores.append(f"{pref} respuestas correctas inválidas")
    elif tipo == "relacionar":
        if len(q.get("pares", [])) < 3 or len({p[1] for p in q["pares"]}) != len(q["pares"]):
            errores.append(f"{pref} pares inválidos")
    elif tipo == "ordenar":
        if len(q.get("orden", [])) < 3:
            errores.append(f"{pref} orden inválido")
    else:
        errores.append(f"{pref} tipo desconocido {tipo}")
    if q.get("alternativas") and len(q["alternativas"]) != len(ops):
        errores.append(f"{pref} las explicaciones por alternativa no coinciden con las opciones")
    if q.get("enlace") and not existe(q["enlace"]["url"]):
        errores.append(f"{pref} «Explorar este concepto» apunta a una página inexistente {q['enlace']['url']}")
if len(pq["preguntas"]) < 100:
    errores.append("psicoquiz: el banco tiene menos de 100 preguntas")
for c in cats_pq:
    if sum(1 for q in pq["preguntas"] if q["categoria"] == c) < 10:
        errores.append(f"psicoquiz: la categoría {c} tiene menos de 10 preguntas")
for n in (1, 2, 3, 4, 5):
    if sum(1 for q in pq["preguntas"] if q["nivel"] == n) < 10:
        errores.append(f"psicoquiz: el nivel {n} tiene menos de 10 preguntas")
for m in ("quien", "error", "caso", "duelo"):
    if sum(1 for q in pq["preguntas"] if m in q.get("modos", [])) < 10:
        errores.append(f"psicoquiz: la modalidad {m} tiene menos de 10 preguntas")
for d in pq["controversias"]:
    if len(d.get("posiciones", [])) < 2 or not d.get("fuentes"):
        errores.append(f"psicoquiz {d['id']}: controversia incompleta")
if not (PUB / "assets/js/psicoquiz-banco.js").is_file():
    errores.append("psicoquiz: falta public/assets/js/psicoquiz-banco.js (corré build.py)")

# Voces que nos habitan: solo citas verificadas, con fuente y temas, sin duplicados, de autores registrados
VOC = RAIZ / "contenido/voces"
if (VOC / "autores.json").is_file():
    reg = json.loads((VOC / "autores.json").read_text(encoding="utf-8"))
    fuentes_v = json.loads((VOC / "fuentes.json").read_text(encoding="utf-8"))
    slugs_mapa = {a["slug"] for a in json.loads((RAIZ / "contenido/mapa_autores.json").read_text(encoding="utf-8"))["autores"]}
    vistos, textos = set(), set()
    for a in reg["autores"]:
        if a["slug"] not in slugs_mapa:
            errores.append(f"voces: el autor {a['slug']} no está en contenido/mapa_autores.json")
        if a.get("estado") != "incorporado":
            continue
        for k in ("nombre", "nombre_completo", "bio", "disciplinas", "obras", "relacion"):
            if not a.get(k):
                errores.append(f"voces {a['slug']}: falta «{k}» en la ficha")
        archivo = VOC / "citas" / f"{a['slug']}.json"
        if not archivo.is_file():
            errores.append(f"voces {a['slug']}: falta {archivo.relative_to(RAIZ)}")
            continue
        citas_v = json.loads(archivo.read_text(encoding="utf-8"))
        publicadas = 0
        for c in citas_v:
            pref = f"voces {c.get('id')}:"
            if c.get("id") in vistos:
                errores.append(f"{pref} id repetido")
            vistos.add(c.get("id"))
            if c.get("fuente") not in fuentes_v:
                errores.append(f"{pref} fuente desconocida {c.get('fuente')}")
            if not c.get("temas"):
                errores.append(f"{pref} sin temas")
            if not c.get("original") or not c.get("traduccion"):
                errores.append(f"{pref} falta el texto original o la traducción")
            clave = re.sub(r"\W+", "", c.get("original", "").lower())
            if clave in textos:
                errores.append(f"{pref} cita duplicada")
            textos.add(clave)
            if c.get("publicada"):
                if not c.get("verificada"):
                    errores.append(f"{pref} publicada sin verificar (corré herramientas/verificar_voces.py)")
                if c.get("tipo") in ("dudosa", "parafrasis"):
                    errores.append(f"{pref} una cita {c['tipo']} no puede publicarse")
                if c.get("verificada") and not c.get("url"):
                    errores.append(f"{pref} verificada pero sin enlace a la fuente")
                publicadas += 1
        if publicadas < 50:
            avisos.append(f"voces {a['slug']}: {publicadas} citas publicadas (el mínimo de la colección es 50)")
        if not existe(f"/recursos/voces-que-nos-habitan/autores/{a['slug']}/"):
            errores.append(f"voces {a['slug']}: no se generó la ficha del autor (corré build.py)")
    if not (PUB / "assets/js/voces-datos.js").is_file():
        errores.append("voces: falta public/assets/js/voces-datos.js (corré build.py)")
    else:
        datos_pub = (PUB / "assets/js/voces-datos.js").read_text(encoding="utf-8")
        for a in reg["autores"]:
            if a.get("estado") == "incorporado":
                for c in json.loads((VOC / "citas" / f"{a['slug']}.json").read_text(encoding="utf-8")):
                    if f'"i":"{c["id"]}"' in datos_pub and not (c.get("publicada") and c.get("verificada")):
                        errores.append(f"voces {c['id']}: aparece en el sitio sin estar publicada y verificada")

for a in avisos:
    print("AVISO ", a)
for e in errores:
    print("ERROR ", e)
print(f"\n{len(paginas)} páginas revisadas · {len(errores)} errores · {len(avisos)} avisos")
sys.exit(1 if errores else 0)
