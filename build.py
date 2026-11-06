#!/usr/bin/env python3
"""Generador del sitio del Lic. Nicolás Raúl Bongiorno.

Uso:
    python3 build.py               # genera public/ (solo artículos publicados)
    python3 build.py --borradores  # incluye artículos en borrador (con noindex) para revisarlos

Sin dependencias externas: solo la biblioteca estándar de Python 3.12+.

Estructura:
    sitio.json              configuración central (WhatsApp, dirección, dominio, redes, GA4...)
    contenido/paginas/*.html  cuerpo de cada página, con metadatos en un comentario inicial <!--{ json }-->
    contenido/blog/*.md       artículos (cabecera clave: valor + Markdown sencillo)
    contenido/*.json          datos reutilizables (motivos, preguntas frecuentes, reseñas)
    assets/                   CSS, JS, tipografías e imágenes (se copian tal cual)
    public/                   SALIDA. Es la carpeta que se publica. No editar a mano.
"""
import base64
import hashlib
import html
import json
import math
import re
import shutil
import sys
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
SALIDA = RAIZ / "public"
CONTENIDO = RAIZ / "contenido"
BORRADORES = "--borradores" in sys.argv

C = json.loads((RAIZ / "sitio.json").read_text(encoding="utf-8"))
URL = C["url"].rstrip("/")
D = C["direccion"]
R = C["redes"]
NOMBRE_COMPLETO = f'{C["prefijo"]} {C["nombre"]}'
WA_BASE = f'https://wa.me/{C["whatsapp_numero"]}'
HOY = C.get("fecha_actualizacion") or date.today().isoformat()

# Script en línea mínimo: marca que hay JS antes del primer pintado (evita parpadeos).
JS_INLINE = ('var d=document.documentElement;d.classList.add("js");'
             'try{var t=localStorage.getItem("nb-tema");if(t==="oscuro"||t==="claro")d.setAttribute("data-tema",t)}catch(e){}'
             'try{if(sessionStorage.getItem("nb-logo"))d.classList.add("logo-visto");else sessionStorage.setItem("nb-logo","1")}catch(e){}')
JS_INLINE_HASH = base64.b64encode(hashlib.sha256(JS_INLINE.encode()).digest()).decode()


def esc(t):
    return html.escape(str(t), quote=True)


def wa(mensaje=None, ubicacion="otro"):
    from urllib.parse import quote
    return f'{WA_BASE}?text={quote(mensaje or C["whatsapp_mensaje"])}'


# --------------------------------------------------------------------------- íconos
ICON = {
    "flecha": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    "flecha-izq": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    "externo": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    "chevron": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    "whatsapp": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href="#i-wa"/></svg>',
    "whatsapp_simbolo": '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="i-wa" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></symbol></svg>',
    "instagram": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg>',
    "linkedin": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.6h3.4V20H3.3zM9 8.6h3.26v1.56h.05c.45-.86 1.56-1.76 3.22-1.76 3.44 0 4.07 2.26 4.07 5.2V20h-3.4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V20H9z"/></svg>',
    "doctoralia": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5 14.6 9l5.9.6-4.4 4 1.3 5.9L12 16.4l-5.4 3.1 1.3-5.9-4.4-4L9.4 9z"/></svg>',
    "mapa": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    "pantalla": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/></svg>',
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    "comillas": '<svg viewBox="0 0 40 32" fill="currentColor" aria-hidden="true"><path d="M0 32V19.6C0 8.9 5.4 2.4 16.2 0l1.7 3.9C11.7 5.8 8.6 9.6 8.4 15.3H16V32zm22.1 0V19.6C22.1 8.9 27.5 2.4 38.3 0L40 3.9c-6.2 1.9-9.3 5.7-9.5 11.4h7.6V32z"/></svg>',
}

# Símbolo de marca: un círculo abierto (ensō: proceso, no clausura) que aloja una semilla (lo que te habita).
SIMBOLO = ('<svg class="marca__simbolo" viewBox="0 0 48 48" aria-hidden="true">'
           '<path class="trazo" pathLength="1" d="M40.6 16.4A18.2 18.2 0 1 0 41.6 28.6" fill="none" stroke="#4A5A3C" stroke-width="2.6" stroke-linecap="round"/>'
           '<path class="trazo trazo--2" pathLength="1" d="M38.4 13.2A18.6 18.6 0 0 0 9.6 13.8" fill="none" stroke="#A3B18A" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>'
           '<circle class="semilla" cx="27.4" cy="26.6" r="4.4" fill="#F4A261"/></svg>')

FORMAS = [  # formas orgánicas para las tarjetas (piedra, onda, hoja, círculo abierto)
    '<svg class="motivo__forma" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 25c0-8 6.5-13 13.5-13S33 16.5 33 23.5 27 32 19.5 32 8 31 8 25z"/></svg>',
    '<svg class="motivo__forma" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><ellipse cx="20" cy="22" rx="16" ry="5"/><ellipse cx="20" cy="22" rx="9" ry="2.6"/><circle cx="20" cy="12" r="3"/></svg>',
    '<svg class="motivo__forma" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><path d="M8 32C9 17 18 8 33 7c-1 15-10 24-25 25z"/><path d="M8 32 24 16"/></svg>',
    '<svg class="motivo__forma" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><path d="M33 14A15 15 0 1 0 34 25"/><circle cx="22" cy="21" r="3" fill="currentColor" stroke="none"/></svg>',
]

DECO_ENSO = ('<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true">'
             '<path class="trazo" pathLength="1" d="M172 70A80 80 0 1 0 178 118" stroke-width="10" stroke-linecap="round"/>'
             '<path class="trazo trazo--2" pathLength="1" d="M160 52A82 82 0 0 0 40 50" stroke-width="3" stroke-linecap="round" opacity=".6"/>'
             '<circle class="semilla" cx="112" cy="110" r="16" fill="currentColor" stroke="none" opacity=".7"/></svg>')

ARTE_HERO = '''<svg class="umbral__arte" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="g-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3EEE4"/><stop offset=".62" stop-color="#E4E8D9"/><stop offset="1" stop-color="#D3DBC3"/></linearGradient>
    <linearGradient id="g-agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9C4A3"/><stop offset="1" stop-color="#8F9F76"/></linearGradient>
    <radialGradient id="g-luz" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FBE3C8"/><stop offset="1" stop-color="#FBE3C8" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="500" fill="url(#g-cielo)"/>
  <circle cx="200" cy="168" r="150" fill="url(#g-luz)"/>
  <circle cx="200" cy="168" r="62" fill="#F7D3AE" opacity=".75"/>
  <path d="M328 120A132 132 0 1 0 336 212" fill="none" stroke="#4A5A3C" stroke-width="3" stroke-linecap="round" opacity=".55"/>
  <path d="M312 92A136 136 0 0 0 98 80" fill="none" stroke="#4A5A3C" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>
  <g class="flota">
    <path d="M400 30C350 50 316 82 296 126" fill="none" stroke="#4A5A3C" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M352 50c-2-16 8-28 22-30-1 15-9 26-22 30z" fill="#7F8F66"/>
    <path d="M330 70c-12-10-12-26-3-36 9 11 10 25 3 36z" fill="#A3B18A"/>
    <path d="M318 92c2-15 14-24 28-23-4 14-14 22-28 23z" fill="#6E7E57"/>
    <path d="M304 112c-11-9-13-24-5-34 9 9 11 23 5 34z" fill="#A3B18A"/>
  </g>
  <rect y="352" width="400" height="148" fill="url(#g-agua)"/>
  <path d="M0 352h400" stroke="#F6F1EB" stroke-width="1" opacity=".6"/>
  <g fill="none" stroke="#F6F1EB" stroke-width="1.3">
    <ellipse class="onda" cx="200" cy="404" rx="150" ry="26"/>
    <ellipse class="onda onda--2" cx="200" cy="404" rx="150" ry="26"/>
    <ellipse class="onda onda--3" cx="200" cy="404" rx="150" ry="26"/>
  </g>
  <g opacity=".28" transform="translate(0 708) scale(1 -1)">
    <path d="M128 356c2-22 34-34 74-34s72 10 72 32c0 6-3 10-6 12H134c-4-2-6-6-6-10z" fill="#4D493F"/>
  </g>
  <path d="M128 356c2-22 34-34 74-34s72 10 72 32c0 6-3 10-6 12H134c-4-2-6-6-6-10z" fill="#77736A"/>
  <path d="M150 322c0-16 24-28 54-28s50 10 50 26c0 9-20 12-52 12s-52-2-52-10z" fill="#ABA394"/>
  <path d="M172 292c0-13 14-22 32-22 17 0 30 8 30 19 0 8-12 10-30 10-19 0-32-1-32-7z" fill="#D9C6AE"/>
  <path d="M184 266c0-11 9-18 21-18 11 0 19 6 19 15 0 6-8 8-19 8-12 0-21-1-21-5z" fill="#E9965A"/>
  <path d="M192 256c3-3 8-4 13-4" stroke="#F9D9BD" stroke-width="2" stroke-linecap="round" fill="none" opacity=".8"/>
</svg>'''


def orbitas_svg():
    """Diagrama de la perspectiva integrativa: psicología analítica al centro, base y marcos en diálogo, y recursos alrededor."""
    cx = cy = 300
    anillo1 = [("Psicoanálisis", -90), ("Terapia sistémica", 0), ("Gestalt", 90), ("Cognitivo-conductual", 180)]
    anillo2 = [("Humanista", -45), ("Logoterapia", 15), ("ACT · DBT", 75), ("Transpersonal", 135), ("Psicología positiva", 200), ("Contextuales", 255)]
    partes = ['<svg viewBox="0 0 600 600" role="img" aria-labelledby="orb-t orb-d">',
              '<title id="orb-t">Perspectiva integrativa</title>',
              '<desc id="orb-d">En el centro, la psicología analítica de C. G. Jung como eje clínico. '
              'Alrededor, la base psicoanalítica y los marcos con los que dialogo: terapia sistémica, Gestalt y cognitivo-conductual. '
              'En el anillo exterior, recursos y lecturas: humanista, logoterapia, ACT y DBT, transpersonal, psicología positiva y terapias contextuales.</desc>',
              f'<circle class="orbita orbita--punteada" cx="{cx}" cy="{cy}" r="262"/>',
              f'<circle class="orbita orbita--trazo" pathLength="1" cx="{cx}" cy="{cy}" r="172"/>',
              f'<circle cx="{cx}" cy="{cy}" r="96" fill="#DDE3D2"/>',
              f'<circle class="orbita-centro" pathLength="1" cx="{cx}" cy="{cy}" r="96" fill="none" stroke="#4A5A3C" stroke-width="1.2"/>',
              f'<text class="centro-titulo" x="{cx}" y="{cy - 12}" text-anchor="middle">Psicología</text>',
              f'<text class="centro-titulo" x="{cx}" y="{cy + 18}" text-anchor="middle">analítica</text>',
              f'<text class="centro-sub" x="{cx}" y="{cy + 44}" text-anchor="middle">C. G. JUNG · EJE</text>',
              f'<g class="giro"><circle cx="{cx + 172}" cy="{cy}" r="4" fill="#F4A261"/><circle cx="{cx - 172}" cy="{cy}" r="3" fill="#A3B18A"/></g>',
              f'<g class="giro giro--inverso"><circle cx="{cx}" cy="{cy - 262}" r="3.5" fill="#A3B18A"/><circle cx="{cx}" cy="{cy + 262}" r="2.5" fill="#F4A261"/></g>']
    for texto, ang in anillo1:
        a = math.radians(ang)
        x, y = cx + 172 * math.cos(a), cy + 172 * math.sin(a)
        partes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="#FBF8F3" stroke="#4A5A3C" stroke-width="1.2"/>')
        ty = y + 30 if ang == 90 else y - 18
        tx, anchor = x, "middle"
        partes.append(f'<text class="etiqueta" style="--i:{len(partes)}" x="{tx:.1f}" y="{ty:.1f}" text-anchor="{anchor}">{esc(texto)}</text>')
    for texto, ang in anillo2:
        a = math.radians(ang)
        x, y = cx + 262 * math.cos(a), cy + 262 * math.sin(a)
        partes.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="#AFAFAF"/>')
        dx = math.cos(a)
        anchor = "start" if dx > .3 else ("end" if dx < -.3 else "middle")
        tx = x - 12 * dx if anchor != "middle" else x
        ty = y + (math.sin(a) * -14) + 4
        anchor = {"start": "end", "end": "start"}.get(anchor, "middle")
        partes.append(f'<text class="etiqueta etiqueta--externa" style="--i:{len(partes)}" x="{tx:.1f}" y="{ty:.1f}" text-anchor="{anchor}">{esc(texto)}</text>')
    partes.append("</svg>")
    return "\n".join(partes)


# --------------------------------------------------------------------------- datos
def cargar_json(nombre):
    return json.loads((CONTENIDO / nombre).read_text(encoding="utf-8"))


MOTIVOS = cargar_json("motivos.json")
FAQ = cargar_json("faq.json")
RESENAS = cargar_json("resenas.json")
GLOSARIO = cargar_json("glosario.json")


# --------------------------------------------------------------------------- Markdown mínimo
def inline_md(t):
    t = esc(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)", r"<em>\1</em>", t)
    t = re.sub(r"\[(.+?)\]\((.+?)\)", lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', t)
    return t


def markdown(md):
    salida, parrafo, lista, tipo = [], [], [], None

    def cerrar():
        nonlocal parrafo, lista, tipo
        if parrafo:
            salida.append(f"<p>{inline_md(' '.join(parrafo))}</p>")
            parrafo = []
        if lista:
            salida.append(f"<{tipo}>" + "".join(f"<li>{inline_md(i)}</li>" for i in lista) + f"</{tipo}>")
            lista, tipo = [], None

    for linea in md.splitlines():
        s = linea.strip()
        if not s:
            cerrar(); continue
        m = re.match(r"^(#{2,3})\s+(.*)", s)
        if m:
            cerrar()
            n = len(m.group(1))
            ident = slug(m.group(2))
            salida.append(f'<h{n} id="{ident}">{inline_md(m.group(2))}</h{n}>'); continue
        if s.startswith("> "):
            cerrar(); salida.append(f"<blockquote><p>{inline_md(s[2:])}</p></blockquote>"); continue
        m = re.match(r"^(?:[-*]|\d+\.)\s+(.*)", s)
        if m:
            if parrafo:
                salida.append(f"<p>{inline_md(' '.join(parrafo))}</p>"); parrafo = []
            t = "ol" if s[0].isdigit() else "ul"
            if tipo and tipo != t:
                cerrar()
            tipo = t; lista.append(m.group(1)); continue
        if s.startswith(":::"):
            cerrar()
            clase = s[3:].strip()
            salida.append(f'<div class="destacado {("destacado--" + clase) if clase else ""}">' if clase != "fin" else "</div>")
            if clase == "fin":
                salida[-1] = "</div>"
            continue
        if lista:
            cerrar()
        parrafo.append(s)
    cerrar()
    return "\n".join(salida)


def slug(t):
    import unicodedata
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


# --------------------------------------------------------------------------- piezas comunes
NAV = [
    ("Sobre mí", "/sobre-mi/", None),
    ("Enfoque", None, [
        ("Terapia junguiana", "/terapia-junguiana/", "Psicología analítica de C. G. Jung"),
        ("Mi enfoque integrativo", "/enfoque/", "Jung, psicoanálisis y otras corrientes"),
        ("Glosario junguiano", "/glosario-junguiano/", "Sombra, arquetipos, individuación…"),
    ]),
    ("Motivos", "/motivos-de-consulta/", None),
    ("Modalidades", None, [
        ("Presencial en Alta Gracia", "/psicologo-alta-gracia/", f'Consultorio en {D["calle"]}'),
        ("Terapia online", "/terapia-online/", "Argentina y el exterior, en español"),
        ("Valle de Paravachasca", "/psicologo-valle-de-paravachasca/", "Anisacate, La Bolsa, Los Aromos…"),
        ("Terapia online por país", "/terapia-online-por-pais/", "Horarios y qué tener en cuenta"),
    ]),
    ("Recursos", "/recursos/", None),
    ("Empezar", None, [
        ("Tu primera consulta", "/primera-consulta/", "Paso a paso, sin sorpresas"),
        ("Preguntas frecuentes", "/preguntas-frecuentes/", "Dudas habituales antes de empezar"),
        ("Opiniones de pacientes", "/opiniones/", "Más de 100 reseñas en Google"),
    ]),
]


def cabecera(ruta):
    items = []
    for i, (txt, href, sub) in enumerate(NAV):
        if sub:
            actual = any(ruta == s[1] for s in sub)
            subitems = "".join(
                f'<li><a href="{h}"{" aria-current=\"page\"" if ruta == h else ""}>{esc(t)}<small>{esc(d)}</small></a></li>' for t, h, d in sub)
            items.append(
                f'<li class="nav__item--sub"><button class="nav__desplegar" type="button" aria-expanded="false" aria-controls="sub-{i}"'
                f'{" data-actual" if actual else ""}>{esc(txt)}{ICON["chevron"]}</button>'
                f'<ul class="nav__sub" id="sub-{i}">{subitems}</ul></li>')
        else:
            cur = ' aria-current="page"' if ruta == href or (href != "/" and ruta.startswith(href)) else ""
            items.append(f'<li><a class="nav__enlace" href="{href}"{cur}>{esc(txt)}</a></li>')
    movil = []
    for txt, href, sub in NAV:
        if sub:
            for t, h, d in sub:
                movil.append(f'<li><a href="{h}">{esc(t)}<small>{esc(d.split(",")[0])}</small></a></li>')
        else:
            movil.append(f'<li><a href="{href}">{esc(txt)}</a></li>')
    movil.append('<li><a href="/contacto/">Contacto</a></li>')
    return f'''<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera">
  <div class="contenedor cabecera__fila">
    <a class="marca" href="/">
      {SIMBOLO}
      <span class="marca__texto"><span class="marca__nombre">Nicolás Bongiorno</span><span class="marca__rol">Psicólogo clínico · {esc(C["matricula"])}</span></span>
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__lista">{"".join(items)}</ul>
      <button class="tema-boton" type="button" aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro"><svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg><svg class="sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg></button>
      <a class="boton boton--chico cabecera__cta" href="/contacto/">Solicitar una consulta</a>
    </nav>
    <div class="cabecera__movil"><button class="tema-boton tema-boton--movil" type="button" aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro"><svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg><svg class="sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg></button><button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu-movil"><span class="menu-boton__texto">Menú</span><span class="menu-boton__lineas" aria-hidden="true"></span></button></div>
  </div>
</header>
<div class="menu-movil" id="menu-movil">
  <nav aria-label="Principal (móvil)"><ul>{"".join(movil)}</ul></nav>
  <div class="menu-movil__pie">
    <a class="boton" href="/contacto/">Solicitar una consulta</a>
    <a class="boton boton--secundario boton--whatsapp" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="menu">{ICON["whatsapp"]} Escribir por WhatsApp</a>
  </div>
</div>'''


def redes_html():
    return f'''<div class="redes">
  <a href="{R["instagram"]}" target="_blank" rel="noopener me" aria-label="Instagram {esc(R["instagram_usuario"])}">{ICON["instagram"]}</a>
  <a href="{R["facebook"]}" target="_blank" rel="noopener me" aria-label="Facebook">{ICON["facebook"]}</a>
  <a href="{R["linkedin"]}" target="_blank" rel="noopener me" aria-label="LinkedIn">{ICON["linkedin"]}</a>
  <a href="{R["doctoralia"]}" target="_blank" rel="noopener" aria-label="Opiniones en Doctoralia">{ICON["doctoralia"]}</a>
</div>'''


def pie():
    anio = HOY[:4]
    return f'''<footer class="pie">
  <div class="contenedor">
    <div class="pie__grilla">
      <div>
        <a class="marca" href="/">{SIMBOLO}<span class="marca__texto"><span class="marca__nombre">Nicolás Bongiorno</span><span class="marca__rol">Psicólogo clínico · {esc(C["matricula"])}</span></span></a>
        <p class="pie__lema">Lo que te habita también merece ser escuchado.</p>
        <p>{esc(NOMBRE_COMPLETO)}. Psicólogo clínico egresado de la {esc(C["facultad"])} de la {esc(C["universidad"])}. Atención presencial en {esc(D["localidad"])} y online.</p>
        {redes_html()}
      </div>
      <div>
        <h2>El espacio</h2>
        <ul>
          <li><a href="/sobre-mi/">Sobre mí</a></li>
          <li><a href="/terapia-junguiana/">Terapia junguiana</a></li>
          <li><a href="/enfoque/">Enfoque terapéutico</a></li>
          <li><a href="/motivos-de-consulta/">Motivos de consulta</a></li>
          <li><a href="/recursos/">Recursos</a></li>
          <li><a href="/glosario-junguiano/">Glosario junguiano</a></li>
          <li><a href="/primera-consulta/">Tu primera consulta</a></li>
          <li><a href="/preguntas-frecuentes/">Preguntas frecuentes</a></li>
          <li><a href="/opiniones/">Opiniones de pacientes</a></li>
        </ul>
      </div>
      <div>
        <h2>Modalidades</h2>
        <ul>
          <li><a href="/psicologo-alta-gracia/">Psicólogo en Alta Gracia</a></li>
          <li><a href="/terapia-online/">Terapia online en español</a></li>
          <li><a href="/terapia-online-por-pais/">Terapia online por país</a></li>
          <li><a href="/psicologo-valle-de-paravachasca/">Valle de Paravachasca</a></li>
          <li><a href="/psicologo-para-adolescentes/">Adolescentes</a></li>
          <li><a href="/terapia-para-adultos-mayores/">Adultos mayores</a></li>
          <li><a href="/contacto/">Solicitar una consulta</a></li>
        </ul>
      </div>
      <div>
        <h2>Consultorio</h2>
        <address>{esc(D["calle"])}<br>{esc(D["localidad"])}, {esc(D["provincia"])}<br>{esc(D["pais_nombre"])}</address>
        <ul style="margin-top:1rem">
          <li><a href="{D["maps_url"]}" target="_blank" rel="noopener">Ver en Google Maps</a></li>
          <li><a href="{wa()}" target="_blank" rel="noopener" data-ubicacion="pie">WhatsApp {esc(C["whatsapp_visible"])}</a></li>
        </ul>
      </div>
    </div>
    <div class="pie__legal">
      <p>© {anio} {esc(NOMBRE_COMPLETO)} · {esc(C["matricula"])} ({esc(C["matricula_entidad"])}). La información de este sitio es orientativa y no reemplaza una consulta profesional. Ante una emergencia, llamá al 911.</p>
      <p><a href="/ayuda-urgente/">Ayuda urgente</a> · <a href="/mapa-del-sitio/">Mapa del sitio</a> · <a href="/privacidad/">Privacidad</a></p>
    </div>
  </div>
</footer>'''


def wa_flotante():
    return (f'<aside aria-label="Contacto rápido por WhatsApp"><a class="wa-flotante" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="flotante" '
            f'aria-label="Escribime por WhatsApp al {esc(C["whatsapp_visible"])}">{ICON["whatsapp"]}<span class="wa-flotante__texto">Escribime</span></a></aside>')


def consentimiento():
    if not C.get("ga4_id"):
        return ""
    return '''<div class="consentimiento" id="consentimiento" role="region" aria-label="Preferencias de privacidad" hidden>
  <p>Uso una herramienta de estadísticas (Google Analytics) para saber qué páginas resultan útiles. No se activa sin tu permiso. <a href="/privacidad/">Más información</a>.</p>
  <div class="acciones"><button class="boton boton--chico" type="button" data-consentir="si">Aceptar</button><button class="boton boton--chico boton--secundario" type="button" data-consentir="no">Rechazar</button></div>
</div>'''


def migas_html(migas):
    if not migas:
        return ""
    lis = ['<li><a href="/">Inicio</a></li>']
    for i, (t, h) in enumerate(migas):
        if i == len(migas) - 1:
            lis.append(f'<li aria-current="page">{esc(t)}</li>')
        else:
            lis.append(f'<li><a href="{h}">{esc(t)}</a></li>')
    return f'<nav class="migas" aria-label="Ruta de navegación"><ol>{"".join(lis)}</ol></nav>'


# --------------------------------------------------------------------------- bloques reutilizables
def bloque_motivos(limite=None):
    items = MOTIVOS[:limite] if limite else MOTIVOS
    out = []
    for i, m in enumerate(items):
        out.append(f'''<article class="motivo revelar" style="--retraso:{(i % 3) * 0.08:.2f}s" id="{slug(m["titulo"])}">
  {FORMAS[i % len(FORMAS)]}
  <span class="motivo__num">{i + 1:02d}</span>
  <h3>{esc(m["titulo"])}</h3>
  <p>{esc(m["texto"])}</p>
  {f'<a class="motivo__enlace" href="{m["pagina"]}">Leer más<span class="visualmente-oculto"> sobre {esc(m["titulo"].lower())}</span> {ICON["flecha"]}</a>' if m.get("pagina") else ""}
</article>''')
    return f'<div class="motivos">{"".join(out)}</div>'


def bloque_faq(ids=None):
    items = [f for f in FAQ if not ids or f["id"] in ids]
    out = []
    for f in items:
        resp = "".join(f"<p>{inline_md(p)}</p>" for p in f["respuesta"])
        out.append(f'''<details id="{f["id"]}">
  <summary><span>{esc(f["pregunta"])}</span><span class="faq__signo" aria-hidden="true"></span></summary>
  <div class="faq__respuesta">{resp}</div>
</details>''')
    return f'<div class="faq">{"".join(out)}</div>'


def faq_schema(ids=None):
    items = [f for f in FAQ if not ids or f["id"] in ids]
    return {
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question", "name": f["pregunta"],
            "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"\[(.+?)\]\(.+?\)", r"\1", " ".join(f["respuesta"])).replace("**", "")}
        } for f in items]
    }


def bloque_resenas():
    r = RESENAS
    citas = []
    for c in r["citas"]:
        citas.append(f'''<figure class="resena">
  <span class="resena__comillas">{ICON["comillas"]}</span>
  <blockquote><p>{esc(c["texto"])}</p></blockquote>
  <figcaption>Paciente · Reseña en {esc(c["fuente"])} · {esc(c["fecha"])}</figcaption>
</figure>''')
    botones = "".join(
        f'<a class="boton {"boton--claro" if i == 0 else "boton--secundario"}" href="{p["url"]}" target="_blank" rel="noopener">'
        f'{esc(p["cantidad"])} en {esc(p["nombre"])} {ICON["externo"]}</a>' for i, p in enumerate(r["plataformas"]))
    d = r["destacado"]
    return f'''<div class="resenas__cabecera">
  <div class="encabezado-seccion" style="margin:0">
    <p class="antetitulo">Experiencias</p>
    <h2>«Las palabras justas», <em>en palabras de mis pacientes</em></h2>
  </div>
  <div class="resenas__dato"><strong data-contar="{esc(d["cantidad"]).lstrip("+")}" data-prefijo="+">{esc(d["cantidad"])}</strong><span>{esc(d["texto"])} <small>(relevado en {esc(r["fecha_relevamiento"])})</small></span></div>
</div>
<div class="carrusel">
  <div class="carrusel__pista" tabindex="0" role="region" aria-label="Fragmentos de opiniones de pacientes">{"".join(citas)}</div>
  <div class="acciones resenas__acciones" style="margin-top:2rem;justify-content:space-between">
    <div class="acciones">{botones}</div>
    <div class="carrusel__controles">
      <div class="carrusel__puntos" aria-hidden="true"></div>
      <button class="carrusel__boton" type="button" data-carrusel="prev" aria-label="Opinión anterior">{ICON["flecha-izq"]}</button>
      <button class="carrusel__boton" type="button" data-carrusel="next" aria-label="Opinión siguiente">{ICON["flecha"]}</button>
    </div>
  </div>
</div>
<p class="resenas__nota">{esc(r["nota"])}</p>'''


def bloque_opiniones():
    temas = {}
    for c in RESENAS.get("todas", []):
        temas.setdefault(c["tema"], []).append(c)
    out = []
    for tema, citas in temas.items():
        figs = "".join(f'''<figure class="opinion revelar"><blockquote><p>{esc(c["texto"])}</p></blockquote>
  <figcaption>Paciente · Google · {esc(c["fecha"])}</figcaption></figure>''' for c in citas)
        out.append(f'<section class="opiniones-tema" id="{slug(tema)}"><h2>{esc(tema)}</h2><div class="opiniones">{figs}</div></section>')
    indice = "".join(f'<li><a href="#{slug(t)}">{esc(t)}</a></li>' for t in temas)
    return f'<ul class="indice-enfoques" aria-label="Temas">{indice}</ul>' + "".join(out)


def bloque_glosario():
    out = []
    for t in GLOSARIO:
        out.append(f'''<div class="termino revelar" id="{slug(t["termino"])}">
  <dt>{esc(t["termino"])}{f' <span>{esc(t["original"])}</span>' if t.get("original") else ""}</dt>
  <dd>{"".join(f"<p>{inline_md(p)}</p>" for p in t["definicion"])}</dd>
</div>''')
    indice = "".join(f'<li><a href="#{slug(t["termino"])}">{esc(t["termino"])}</a></li>' for t in GLOSARIO)
    return f'<ul class="indice-enfoques" aria-label="Términos">{indice}</ul><dl class="glosario">{"".join(out)}</dl>'


def glosario_schema():
    return {"@type": "DefinedTermSet", "@id": f"{URL}/glosario-junguiano/#glosario", "name": "Glosario de psicología analítica junguiana",
            "inLanguage": C["idioma"], "author": {"@id": f"{URL}/#nicolas-bongiorno"},
            "hasDefinedTerm": [{"@type": "DefinedTerm", "name": t["termino"], "url": f'{URL}/glosario-junguiano/#{slug(t["termino"])}',
                                "description": re.sub(r"\[(.+?)\]\(.+?\)", r"\1", " ".join(t["definicion"])).replace("*", "")} for t in GLOSARIO]}


def bloque_datos_clave():
    filas = [
        ("Nombre", NOMBRE_COMPLETO),
        ("Profesión", f'{C["profesion"]}, {C["matricula"]} ({C["matricula_entidad"]})'),
        ("Formación de grado", f'Licenciatura en Psicología, {C["facultad"]}, {C["universidad"]}'),
        ("Trayectoria", f'{C["anios_experiencia"].capitalize()} de práctica clínica'),
        ("Enfoque", "Psicología analítica de C. G. Jung como eje, base psicoanalítica y perspectiva integrativa"),
        ("Atiende a", "Adolescentes, adultos y adultos mayores"),
        ("Modalidades", f'Presencial en {D["calle"]}, {D["localidad"]}, {D["provincia"]} · Online por videollamada, en español'),
        ("Honorarios", "Atención particular, con factura para solicitar reintegro a la obra social o prepaga"),
        ("Opiniones", "Más de 100 reseñas en Google y 80 en Doctoralia"),
        ("Contacto", f'WhatsApp {C["whatsapp_visible"]}'),
    ]
    dl = "".join(f"<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>" for k, v in filas)
    return f'<aside class="datos-clave" aria-labelledby="titulo-datos-clave"><h2 id="titulo-datos-clave">Datos clave</h2><dl>{dl}</dl></aside>'


WIKI = {
    "jung": ("Carl Gustav Jung", "https://es.wikipedia.org/wiki/Carl_Gustav_Jung"),
    "freud": ("Sigmund Freud", "https://es.wikipedia.org/wiki/Sigmund_Freud"),
    "bowlby": ("John Bowlby", "https://es.wikipedia.org/wiki/John_Bowlby"),
    "psicologia-analitica": ("Psicología analítica", "https://es.wikipedia.org/wiki/Psicolog%C3%ADa_anal%C3%ADtica"),
    "ansiedad": ("Ansiedad", "https://es.wikipedia.org/wiki/Ansiedad"),
    "duelo": ("Duelo", "https://es.wikipedia.org/wiki/Duelo_(sentimiento)"),
    "depresion": ("Depresión", "https://es.wikipedia.org/wiki/Depresi%C3%B3n"),
}

CATEGORIAS = {
    "Jung y psicología analítica": "Sueños, sombra, arquetipos e individuación: la psicología analítica de Carl Gustav Jung, explicada para la vida cotidiana.",
    "Ansiedad y emociones": "Ansiedad, ataques de pánico y emociones difíciles: qué nos dicen, por qué aparecen y cómo atravesarlas con ayuda.",
    "Vínculos y relaciones": "Patrones que se repiten, dependencia emocional y la forma en que nos vinculamos con la pareja, la familia y los otros.",
    "Salud mental": "Cuándo consultar a un psicólogo, cómo acompañar a alguien que sufre y cómo cuidar la propia salud mental.",
    "Psicología contemporánea": "Psicoterapia integrativa, terapia online, duelo migratorio y otros temas de la psicología de hoy, en lenguaje claro.",
    "Desarrollo personal": "Crisis vitales, la crisis de la mitad de la vida, búsqueda de sentido y autoconocimiento desde una mirada junguiana.",
}


def ruta_categoria(cat):
    return f"/recursos/{slug(cat)}/"


def respuesta_breve(texto):
    if not texto:
        return ""
    return (f'<div class="respuesta-breve" role="note"><p class="respuesta-breve__titulo">En pocas palabras</p>'
            f'<p>{inline_md(texto)}</p></div>')


def faq_html(items, titulo=None):
    out = []
    for i, f in enumerate(items):
        resp = "".join(f"<p>{inline_md(p)}</p>" for p in f["respuesta"])
        out.append(f'''<details id="pregunta-{i + 1}">
  <summary><span>{esc(f["pregunta"])}</span><span class="faq__signo" aria-hidden="true"></span></summary>
  <div class="faq__respuesta">{resp}</div>
</details>''')
    cab = f'<h2 id="preguntas-frecuentes">{esc(titulo)}</h2>' if titulo else ""
    return f'{cab}<div class="faq">{"".join(out)}</div>'


def faq_schema_items(items):
    return {"@type": "FAQPage", "mainEntity": [{
        "@type": "Question", "name": f["pregunta"],
        "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"\[(.+?)\]\(.+?\)", r"\1", " ".join(f["respuesta"])).replace("**", "").replace("*", "")}
    } for f in items]}


def extraer_faq(md):
    """Separa la sección «## Preguntas frecuentes» (### pregunta + párrafos) del resto del Markdown."""
    m = re.search(r"^## Preguntas frecuentes\s*$", md, re.M)
    if not m:
        return md, []
    antes, seccion = md[:m.start()], md[m.end():]
    sig = re.search(r"^## ", seccion, re.M)
    despues = seccion[sig.start():] if sig else ""
    seccion = seccion[:sig.start()] if sig else seccion
    items = []
    for bloque in re.split(r"^### ", seccion, flags=re.M)[1:]:
        lineas = bloque.strip().split("\n", 1)
        pars = [p.strip().replace("\n", " ") for p in (lineas[1] if len(lineas) > 1 else "").split("\n\n") if p.strip()]
        items.append({"pregunta": lineas[0].strip(), "respuesta": pars})
    return antes + despues, items


TERMINOS_GLOSARIO = [
    ("psicologia-analitica", r"psicología analítica"),
    ("inconsciente-colectivo", r"inconsciente colectivo"),
    ("arquetipo", r"arquetipos?"),
    ("sombra", r"(?<!dar )sombra"),
    ("individuacion", r"individuación"),
    ("proyeccion", r"proyecci(?:ón|ones)"),
    ("sincronicidad", r"sincronicidad"),
    ("anima-y-animus", r"ánima"),
    ("si-mismo", r"sí-mismo"),
    ("imaginacion-activa", r"imaginación activa"),
    ("amplificacion", r"amplificación"),
    ("mandala", r"mandalas?"),
    ("tipos-psicologicos", r"tipos psicológicos"),
    ("complejo", r"complejos"),
]


def enlazar_glosario(htm):
    """Enlaza la primera aparición de cada término del glosario dentro de párrafos, sin tocar enlaces existentes."""
    usados = {t for t, _ in TERMINOS_GLOSARIO if f"/glosario-junguiano/#{t}" in htm}

    def en_parrafo(mp):
        p = mp.group(0)
        for ancla, patron in TERMINOS_GLOSARIO:
            if ancla in usados:
                continue
            partes = re.split(r"(<a\b.*?</a>)", p, flags=re.S)
            hecho = False
            for i, parte in enumerate(partes):
                if parte.startswith("<a") or hecho:
                    continue
                rx = re.compile(r"(?<![\w-])(" + patron + r")(?![\w-])", re.I)
                # no reemplazar dentro de etiquetas
                trozos = re.split(r"(<[^>]+>)", parte)
                for j, tr in enumerate(trozos):
                    if tr.startswith("<"):
                        continue
                    mm = rx.search(tr)
                    if mm:
                        trozos[j] = tr[:mm.start()] + f'<a class="enlace-glosario" href="/glosario-junguiano/#{ancla}">{mm.group(1)}</a>' + tr[mm.end():]
                        hecho = True
                        break
                partes[i] = "".join(trozos)
            if hecho:
                usados.add(ancla)
                p = "".join(partes)
        return p

    return re.sub(r"<(p|li)>.*?</\1>", en_parrafo, htm, flags=re.S)


def prueba_social(clave):
    cortas = [c for c in RESENAS.get("todas", []) if len(c["texto"]) <= 120]
    if not cortas:
        return ""
    c = cortas[int(hashlib.md5(clave.encode()).hexdigest(), 16) % len(cortas)]
    return (f'<p class="cta__prueba"><span class="cta__comilla">«{esc(c["texto"])}»</span>'
            f'<span class="cta__fuente">Paciente en Google · <a href="/opiniones/">+100 opiniones</a></span></p>')


def bloque_asistente():
    motivos = ["Ansiedad o ataques de pánico", "Tristeza o desgano", "Un duelo o una pérdida", "Mis vínculos o mi pareja",
               "Una crisis o un cambio de etapa", "Conocerme más", "Todavía no lo sé"]
    def opciones(nombre, lista):
        return "".join(f'<label class="opcion"><input type="radio" name="{nombre}" value="{esc(v)}"><span>{esc(v)}</span></label>' for v in lista)
    return f'''<section class="asistente revelar" id="empezar" aria-labelledby="titulo-asistente">
  <p class="antetitulo">Empezar en 3 pasos</p>
  <h2 id="titulo-asistente">No hace falta saber <em>qué escribir</em></h2>
  <p class="asistente__intro">Elegí tres opciones y te armo el mensaje para que lo envíes por WhatsApp. No es un test ni un diagnóstico, y no se guarda ningún dato.</p>
  <form class="asistente__form" id="asistente" novalidate>
    <fieldset class="asistente__paso" data-paso="1"><legend><span>1</span> ¿Qué te trae?</legend><div class="opciones">{opciones("motivo", motivos)}</div></fieldset>
    <fieldset class="asistente__paso" data-paso="2"><legend><span>2</span> ¿Cómo preferís?</legend><div class="opciones">{opciones("modalidad", ["Presencial en Alta Gracia", "Online", "Me da igual"])}</div></fieldset>
    <fieldset class="asistente__paso" data-paso="3"><legend><span>3</span> ¿Qué horario te queda mejor?</legend><div class="opciones">{opciones("horario", ["Mañana", "Tarde", "Noche", "Cualquiera"])}</div></fieldset>
    <div class="asistente__vista" aria-live="polite"><p class="asistente__vista-titulo">Tu mensaje</p><p class="asistente__texto">Hola, Nicolás. Te escribo desde tu web para consultar por un turno.</p></div>
    <a class="boton boton--whatsapp asistente__enviar" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="asistente">{ICON["whatsapp"]} Enviar por WhatsApp</a>
  </form>
</section>'''


def bloque_compartir(titulo, ruta):
    from urllib.parse import quote
    url = f"{URL}{ruta}"
    wa_txt = quote(f"{titulo} — {url}")
    return f'''<div class="compartir" aria-label="Compartir este artículo">
  <p class="compartir__titulo">¿Te sirvió? Compartilo con alguien a quien pueda ayudarle</p>
  <div class="compartir__acciones">
    <a class="compartir__boton" href="https://wa.me/?text={wa_txt}" target="_blank" rel="noopener" data-ubicacion="compartir">{ICON["whatsapp"]}<span>WhatsApp</span></a>
    <button class="compartir__boton" type="button" data-copiar="{url}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg><span>Copiar enlace</span></button>
    <button class="compartir__boton compartir__nativo" type="button" data-compartir="{url}" data-titulo="{esc(titulo)}" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg><span>Más opciones</span></button>
  </div>
  <p class="compartir__estado" role="status" aria-live="polite"></p>
</div>'''


def indice_articulo(html_md):
    hs = [(i, t) for i, t in re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', html_md) if i not in ("para-seguir-leyendo", "preguntas-frecuentes")]
    if len(hs) < 4:
        return ""
    items = "".join(f'<li><a href="#{i}">{t}</a></li>' for i, t in hs)
    return f'<details class="indice-articulo" open><summary class="indice-articulo__titulo">En este artículo</summary><ol>{items}</ol></details>'


def leer_mas(slugs):
    arts = [a for s_ in slugs for a in ARTICULOS if a["archivo"][:-3] == s_ and (a["publicado"] or BORRADORES)]
    if not arts:
        return ""
    items = "".join(f'''<article class="articulo-tarjeta">
  <a class="articulo-tarjeta__cat" href="{ruta_categoria(a["categoria"])}">{esc(a["categoria"])}</a>
  <h3><a href="{a["ruta"]}">{esc(a["titulo"])}</a></h3>
  <p>{esc(a["resumen"])}</p>
</article>''' for a in arts)
    return f'''<section class="seccion seccion--papel leer-mas" aria-labelledby="titulo-leer-mas"><div class="contenedor">
  <div class="encabezado-seccion revelar"><p class="antetitulo">Recursos</p><h2 id="titulo-leer-mas">Para seguir <em>pensándolo</em></h2></div>
  <div class="articulos">{items}</div>
</div></section>'''


def minificar_css(css):
    partes = re.split(r"(\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*')", css)
    for i in range(0, len(partes), 2):
        p = re.sub(r"/\*.*?\*/", "", partes[i], flags=re.S)
        p = re.sub(r"\s+", " ", p)
        p = re.sub(r"\s*([{};,>])\s*", r"\1", p)
        p = p.replace(";}", "}")
        partes[i] = p
    return "".join(partes).strip()


def barra_movil():
    return (f'<aside class="barra-movil" aria-label="Contacto rápido">'
            f'<a class="barra-movil__turno" href="/contacto/#empezar">Pedir turno</a>'
            f'<a class="barra-movil__wa" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="barra-movil">{ICON["whatsapp"]} WhatsApp</a></aside>')


def bloque_cta(titulo="¿Querés empezar a <em>conversarlo</em>?", texto=None, ubicacion="cta", suave=False):
    texto = texto or ("Escribime y coordinamos una primera entrevista, en Alta Gracia u online. "
                      "No hace falta traer nada resuelto: alcanza con las ganas de empezar a mirar.")
    return f'''<div class="cta{" cta--suave" if suave else ""} revelar">
  <div class="cta__deco">{DECO_ENSO}</div>
  <p class="antetitulo">Primer paso</p>
  <h2>{titulo}</h2>
  <p>{texto}</p>
  <p class="cta__nota">La primera entrevista es para conocernos, sin compromiso de continuar.</p>
  {prueba_social(titulo)}
  <div class="acciones" style="margin-top:1.5rem">
    <a class="boton boton--claro" href="/contacto/">Solicitar una consulta {ICON["flecha"]}</a>
    <a class="boton boton--secundario boton--whatsapp" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="{ubicacion}">{ICON["whatsapp"]} WhatsApp</a>
  </div>
</div>'''


def retrato(clase="retrato", cual="foto"):
    extras = {
        "foto_lectura": (f"{NOMBRE_COMPLETO} leyendo en un sillón, junto a una ventana", 682, 852),
        "foto_sobre_mi": (f"{NOMBRE_COMPLETO}, psicólogo clínico, sentado en un sillón con gesto pensativo", 552, 691),
        "foto_biblioteca": (f"{NOMBRE_COMPLETO} sentado en un sillón frente a una biblioteca", 768, 960),
    }
    if cual in extras and C.get(cual):
        alt, w, h = extras[cual]
        return (f'<div class="{clase}"><img src="/{C[cual]}" alt="{esc(alt)}" '
                f'width="{w}" height="{h}" loading="lazy" decoding="async"></div>')
    if C.get("foto"):
        srcset = f' srcset="/{C["foto_chica"]} 480w, /{C["foto"]} 682w" sizes="(max-width: 860px) 340px, 480px"' if C.get("foto_chica") else ""
        return (f'<div class="{clase}"><img src="/{C["foto"]}"{srcset} alt="Retrato del {esc(NOMBRE_COMPLETO)}, psicólogo clínico" '
                f'width="682" height="852" loading="lazy" decoding="async"></div>')
    return (f'<div class="{clase} retrato--monograma" role="img" aria-label="Símbolo de marca: un círculo abierto que contiene una semilla">'
            '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M172 70A80 80 0 1 0 178 118" fill="none" stroke="#4A5A3C" stroke-width="7" stroke-linecap="round"/>'
            '<path d="M160 52A82 82 0 0 0 40 50" fill="none" stroke="#A3B18A" stroke-width="2.5" stroke-linecap="round"/>'
            '<circle cx="112" cy="110" r="15" fill="#F4A261"/></svg>'
            '<p class="retrato__nota"><strong>Un círculo abierto</strong>Un proceso que no se cierra sobre sí mismo, y algo propio que lo habita.</p></div>')


def umbral():
    srcset = f' srcset="/{C["foto_chica"]} 480w, /{C["foto"]} 682w" sizes="(max-width: 520px) 270px, (max-width: 900px) 340px, 480px"' if C.get("foto_chica") else ""
    interior = (f'<img src="/{C["foto"]}"{srcset} alt="Retrato del {esc(NOMBRE_COMPLETO)}, psicólogo clínico" width="682" height="852" fetchpriority="high">'
                if C.get("foto") else ARTE_HERO)
    return f'''<div class="umbral entra" style="--retraso:.35s">
  <div class="umbral__aro" aria-hidden="true" data-parallax="-0.04"></div>
  <div class="umbral__marco">{interior}</div>
  <div class="umbral__sello"><strong data-contar="15" data-prefijo="+">+15</strong><span>años de práctica clínica</span></div>
</div>'''


def articulos_lista(publicados_solo=False, limite=None, categoria=None):
    out = []
    lista = [a for a in ARTICULOS if not categoria or a["categoria"] == categoria]
    for a in (lista[:limite] if limite else lista):
        if publicados_solo and not a["publicado"]:
            continue
        enlace = a["publicado"] or BORRADORES
        titulo = f'<a href="{a["ruta"]}">{esc(a["titulo"])}</a>' if enlace else esc(a["titulo"])
        vt = f' style="view-transition-name: t-{a["archivo"][:-3]}"' if enlace else ""
        estado = "" if a["publicado"] else '<span class="articulo-tarjeta__estado">En preparación</span>'
        out.append(f'''<article class="articulo-tarjeta revelar">
  <a class="articulo-tarjeta__cat" href="{ruta_categoria(a["categoria"])}">{esc(a["categoria"])}</a>
  <h3{vt}>{titulo}</h3>
  <p>{esc(a["resumen"])}</p>
  {estado}
</article>''')
    return f'<div class="articulos">{"".join(out)}</div>'


# --------------------------------------------------------------------------- datos estructurados
def persona_schema():
    p = {
        "@type": "Person",
        "@id": f"{URL}/#nicolas-bongiorno",
        "name": NOMBRE_COMPLETO.replace("Lic. ", ""),
        "honorificPrefix": C["prefijo"],
        "alternateName": ["Nicolás Bongiorno", "Lic. Nicolás Bongiorno", "Psicólogo Bongiorno"],
        "jobTitle": C["profesion"],
        "description": ("Psicólogo clínico (M.P. 8209, Córdoba) con más de 15 años de práctica. Orientación junguiana (psicología analítica) "
                        "con base psicoanalítica y perspectiva integrativa. Atiende adolescentes, adultos y adultos mayores en Alta Gracia "
                        "(Córdoba, Argentina) y online en español."),
        "url": f"{URL}/sobre-mi/",
        "alumniOf": {"@type": "CollegeOrUniversity", "name": C["universidad"], "department": C["facultad"], "sameAs": "https://www.unc.edu.ar/"},
        "hasCredential": {
            "@type": "EducationalOccupationalCredential", "credentialCategory": "Matrícula profesional",
            "name": f'Matrícula profesional de psicólogo {C["matricula"]}', "identifier": C["matricula"],
            "recognizedBy": {"@type": "Organization", "name": C["matricula_entidad"]}
        },
        "knowsAbout": ["Psicología analítica de Carl Gustav Jung", "Psicoterapia junguiana", "Psicoanálisis", "Psicoterapia psicodinámica",
                       "Psicoterapia integrativa", "Ansiedad", "Depresión", "Ataques de pánico", "Duelo",
                       "Dificultades vinculares", "Autoconocimiento"],
        "knowsLanguage": "es",
        "workLocation": {"@id": f"{URL}/#consultorio"},
        "memberOf": {"@type": "MedicalOrganization", "name": "Centro Sinapsis", "url": "https://sinapsiscentro.com.ar/"},
        "sameAs": [R["instagram"], R["facebook"], R["linkedin"], R["doctoralia"], C["centro_sinapsis"]],
        "address": {"@id": f"{URL}/#direccion"},
    }
    if C.get("foto"):
        p["image"] = [{"@type": "ImageObject", "url": f'{URL}/{C[k]}', "caption": NOMBRE_COMPLETO}
                      for k in ("foto", "foto_lectura", "foto_sobre_mi", "foto_biblioteca") if C.get(k)]
    if C.get("email"):
        p["email"] = C["email"]
    return p


def consultorio_schema():
    c = {
        "@type": ["MedicalBusiness", "ProfessionalService"],
        "@id": f"{URL}/#consultorio",
        "name": f'{NOMBRE_COMPLETO} — Psicólogo clínico',
        "description": "Consultorio de psicología clínica y psicoterapia en Alta Gracia, Córdoba. Atención presencial y online para adolescentes, adultos y adultos mayores.",
        "url": f"{URL}/",
        "telephone": C["telefono_e164"],
        "image": f"{URL}/assets/img/og-inicio.jpg",
        "logo": f"{URL}/assets/img/simbolo-512.png",
        "address": {"@type": "PostalAddress", "@id": f"{URL}/#direccion", "streetAddress": D["calle"], "addressLocality": D["localidad"],
                    "addressRegion": D["provincia"], "postalCode": D["codigo_postal"], "addressCountry": D["pais"]},
        "hasMap": D["maps_url"],
        "areaServed": [
            {"@type": "City", "name": "Alta Gracia"},
            {"@type": "AdministrativeArea", "name": "Provincia de Córdoba"},
            {"@type": "Country", "name": "Argentina"},
        ],
        "availableLanguage": "es",
        "founder": {"@id": f"{URL}/#nicolas-bongiorno"},
        "employee": {"@id": f"{URL}/#nicolas-bongiorno"},
        "contactPoint": {"@type": "ContactPoint", "contactType": "Turnos y consultas", "telephone": C["telefono_e164"],
                         "availableLanguage": "es", "url": wa()},
        "sameAs": [R["instagram"], R["facebook"], R["doctoralia"]],
        "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": n, "url": f"{URL}{r}", "provider": {"@id": f"{URL}/#nicolas-bongiorno"}}} for n, r in [
            ("Psicoterapia individual presencial en Alta Gracia", "/psicologo-alta-gracia/"),
            ("Psicoterapia online en español", "/terapia-online/"),
            ("Terapia junguiana (psicología analítica)", "/terapia-junguiana/"),
            ("Psicoterapia para adolescentes", "/psicologo-para-adolescentes/"),
            ("Psicoterapia para adultos mayores", "/terapia-para-adultos-mayores/"),
            ("Tratamiento psicológico de la ansiedad y los ataques de pánico", "/ansiedad-y-ataques-de-panico/"),
            ("Tratamiento psicológico de la depresión", "/depresion/"),
            ("Acompañamiento en duelos y pérdidas", "/duelo-y-perdidas/"),
            ("Psicoterapia para crisis vitales", "/crisis-vitales/"),
            ("Psicoterapia para el estrés y el agotamiento", "/estres-y-agotamiento/"),
            ("Psicoterapia del trauma y regulación emocional", "/trauma/"),
            ("Psicoterapia para la autoestima", "/autoestima/"),
            ("Psicoterapia para dificultades vinculares", "/dificultades-vinculares/"),
        ]],
        "paymentAccepted": "Atención particular, con factura para reintegro de obra social o prepaga",
    }
    if C.get("email"):
        c["email"] = C["email"]
    return c


def sitio_schema():
    return {"@type": "WebSite", "@id": f"{URL}/#sitio", "url": f"{URL}/", "name": "Nicolás Bongiorno · Psicólogo clínico",
            "alternateName": "Lo que te habita", "inLanguage": C["idioma"], "publisher": {"@id": f"{URL}/#nicolas-bongiorno"}}


def migas_schema(migas):
    elems = [{"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{URL}/"}]
    for i, (t, h) in enumerate(migas, start=2):
        elems.append({"@type": "ListItem", "position": i, "name": t, "item": f"{URL}{h}"})
    return {"@type": "BreadcrumbList", "itemListElement": elems}


# --------------------------------------------------------------------------- plantilla
def csp():
    script = ["'self'", f"'sha256-{JS_INLINE_HASH}'"]
    connect = ["'self'"]
    img = ["'self'", "data:"]
    if C.get("ga4_id"):
        script.append("https://www.googletagmanager.com")
        connect += ["https://www.google-analytics.com", "https://*.google-analytics.com", "https://*.analytics.google.com"]
        img += ["https://www.google-analytics.com", "https://www.googletagmanager.com"]
    if C.get("formulario_endpoint"):
        from urllib.parse import urlparse
        u = urlparse(C["formulario_endpoint"])
        connect.append(f"{u.scheme}://{u.netloc}")
    return ("default-src 'self'; " f"script-src {' '.join(script)}; " "style-src 'self' 'unsafe-inline'; "
            f"img-src {' '.join(img)}; " "font-src 'self'; " f"connect-src {' '.join(connect)}; "
            "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests")


def pagina(meta, cuerpo, ruta):
    titulo = meta["titulo"]
    desc = meta["descripcion"]
    canon = f"{URL}{ruta}"
    og = meta.get("og", "og-inicio.jpg")
    grafo = [sitio_schema(), persona_schema()]
    if meta.get("con_consultorio", True):
        grafo.append(consultorio_schema())
    if meta.get("migas"):
        grafo.append(migas_schema(meta["migas"]))
    grafo += meta.get("schema_extra", [])
    if meta.get("faq_items"):
        grafo.append(faq_schema_items(meta["faq_items"]))
    if meta.get("glosario_schema"):
        grafo.append(glosario_schema())
    if meta.get("faq_schema"):
        grafo.append(faq_schema(meta["faq_schema"] if isinstance(meta["faq_schema"], list) else None))
    pag_tipo = meta.get("tipo_pagina", "WebPage")
    pagina_schema = {"@type": pag_tipo, "@id": f"{canon}#pagina", "url": canon, "name": titulo, "description": desc,
                     "inLanguage": C["idioma"], "isPartOf": {"@id": f"{URL}/#sitio"}, "dateModified": meta.get("modificado", HOY)}
    if meta.get("revisado"):
        pagina_schema["reviewedBy"] = {"@id": f"{URL}/#nicolas-bongiorno"}
        pagina_schema["lastReviewed"] = meta["revisado"]
    if pag_tipo == "ProfilePage":
        pagina_schema["mainEntity"] = {"@id": f"{URL}/#nicolas-bongiorno"}
    else:
        pagina_schema["about"] = {"@id": f"{URL}/#nicolas-bongiorno"}
    if meta.get("migas"):
        pagina_schema["breadcrumb"] = {"@type": "BreadcrumbList", "@id": None}
        del pagina_schema["breadcrumb"]
    grafo.insert(1, pagina_schema)
    jsonld = json.dumps({"@context": "https://schema.org", "@graph": grafo}, ensure_ascii=False, separators=(",", ":"))
    robots = "noindex, follow" if meta.get("noindex") else "index, follow, max-image-preview:large"
    verif = ""
    if C.get("search_console_token"):
        verif += f'<meta name="google-site-verification" content="{esc(C["search_console_token"])}">\n'
    if C.get("bing_token"):
        verif += f'<meta name="msvalidate.01" content="{esc(C["bing_token"])}">\n'
    config_js = json.dumps({"whatsapp": C["whatsapp_numero"], "ga4": C.get("ga4_id", ""), "formEndpoint": C.get("formulario_endpoint", "")})
    og_tipo = "article" if meta.get("articulo") else ("profile" if pag_tipo == "ProfilePage" else "website")
    art_meta = ""
    if meta.get("articulo"):
        art_meta = (f'<meta property="article:published_time" content="{meta["articulo"]["fecha"]}">\n'
                    f'<meta property="article:author" content="{URL}/sobre-mi/">\n')
    return f'''<!doctype html>
<html lang="{C["idioma"]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{canon}">
<meta name="author" content="{esc(NOMBRE_COMPLETO)}">
<meta name="theme-color" content="#F6F1EB" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1B1A17" media="(prefers-color-scheme: dark)">
<meta name="format-detection" content="telephone=no">
<meta name="geo.region" content="AR-X">
<meta name="geo.placename" content="Alta Gracia, Córdoba">
{verif}<meta property="og:type" content="{og_tipo}">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="Nicolás Bongiorno · Psicólogo clínico">
<meta property="og:title" content="{esc(meta.get("og_titulo", titulo))}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{URL}/assets/img/{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(meta.get("og_alt", "Lic. Nicolás Raúl Bongiorno, psicólogo clínico en Alta Gracia y online"))}">
{art_meta}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Recursos · Nicolás Bongiorno" href="/recursos/feed.xml">
<link rel="preload" href="/assets/fonts/playfair-display-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/lora-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/estilos.css?v={VERSION}">
<script>{JS_INLINE}</script>
<script type="application/ld+json">
{jsonld}
</script>
<script type="application/json" id="config-sitio">{config_js}</script>
<script src="/assets/js/sitio.js?v={VERSION}" defer></script>
{'<script src="/_vercel/insights/script.js" defer></script>' if C.get("vercel_analytics") else ""}
</head>
<body>
{ICON["whatsapp_simbolo"]}
{cabecera(ruta)}
<main id="contenido">
{cuerpo}
</main>
{pie()}
{wa_flotante()}
{barra_movil()}
{consentimiento()}
</body>
</html>
'''


def portada(meta, extra=""):
    return f'''<section class="portada">
  <div class="portada__deco">{DECO_ENSO}</div>
  <div class="contenedor">
    {migas_html(meta.get("migas"))}
    <p class="antetitulo">{esc(meta.get("antetitulo", ""))}</p>
    <h1>{meta["h1"]}</h1>
    {f'<p class="bajada">{meta["bajada"]}</p>' if meta.get("bajada") else ""}
    {respuesta_breve(meta.get("respuesta"))}
    {extra}
  </div>
</section>'''


# --------------------------------------------------------------------------- artículos
def leer_articulos():
    arts = []
    for f in sorted((CONTENIDO / "blog").glob("*.md")):
        txt = f.read_text(encoding="utf-8")
        cab, cuerpo = txt.split("\n---\n", 1)
        meta = {}
        for l in cab.strip().strip("-").strip().splitlines():
            if ":" in l:
                k, v = l.split(":", 1)
                meta[k.strip()] = v.strip()
        meta["publicado"] = meta.get("estado") == "publicado"
        meta["ruta"] = f'/recursos/{f.stem}/'
        meta["md"] = cuerpo
        meta["archivo"] = f.name
        arts.append(meta)
    arts.sort(key=lambda a: int(a.get("orden", 99)))
    return arts


ARTICULOS = leer_articulos()


def relacionados(a):
    otros = [x for x in ARTICULOS if x is not a and (x["publicado"] or BORRADORES)]
    otros.sort(key=lambda x: (x["categoria"] != a["categoria"], int(x.get("orden", 99))))
    if not otros:
        return ""
    items = "".join(f'<li><a href="{x["ruta"]}"><span>{esc(x["categoria"])}</span>{esc(x["titulo"])}</a></li>' for x in otros[:3])
    return f'<nav class="relacionados" aria-label="Artículos relacionados"><h2>Seguí leyendo</h2><ul>{items}</ul></nav>'


def render_articulo(a):
    migas = [("Recursos", "/recursos/"), (a["categoria"], ruta_categoria(a["categoria"])), (a["titulo"], a["ruta"])]
    md_sin_faq, faq_items = extraer_faq(a["md"])
    html_md = markdown(md_sin_faq)
    corte = html_md.find('<h2 id="para-seguir-leyendo">')
    cuerpo_md = enlazar_glosario(html_md) if corte < 0 else enlazar_glosario(html_md[:corte]) + html_md[corte:]
    og = f'og/{a["archivo"][:-3]}.jpg'
    og = og if (RAIZ / "assets/img" / og).exists() else "og-inicio.jpg"
    menciones = [{"@type": "Thing", "name": WIKI[k][0], "sameAs": WIKI[k][1]}
                 for k in [x.strip() for x in a.get("menciona", "").split(",")] if k in WIKI]
    aviso = "" if a["publicado"] else (
        '<p class="articulo__aviso" role="note"><strong>Borrador en revisión.</strong> Este texto todavía no fue revisado ni publicado por el Lic. Bongiorno. '
        'No está indexado en buscadores.</p>')
    cuerpo = f'''<div class="progreso-lectura" aria-hidden="true"><span></span></div>
<article>
<section class="portada">
  <div class="portada__deco">{DECO_ENSO}</div>
  <div class="contenedor--texto">
    {migas_html(migas)}
    <p class="antetitulo"><a href="{ruta_categoria(a["categoria"])}">{esc(a["categoria"])}</a></p>
    <h1 style="view-transition-name: t-{a["archivo"][:-3]}">{esc(a["titulo"])}</h1>
    <p class="bajada">{esc(a["resumen"])}</p>
    <p class="articulo__meta"><span>Escrito y revisado por <a href="/sobre-mi/">{esc(NOMBRE_COMPLETO)}</a>, psicólogo clínico ({esc(C["matricula"])})</span><span>Lectura de {esc(a.get("lectura", "6"))} minutos</span><span>Última revisión: <time datetime="{a.get("revision", a.get("fecha", HOY))}">{esc(a.get("fecha_visible", a.get("fecha", HOY)))}</time></span></p>
  </div>
</section>
<div class="contenedor--texto prosa" style="padding-bottom:var(--sec)">
  {aviso}
  {respuesta_breve(a.get("respuesta"))}
  {indice_articulo(cuerpo_md)}
  {cuerpo_md}
  {faq_html(faq_items, "Preguntas frecuentes") if faq_items else ""}
  <div class="destacado destacado--aviso"><p>Este artículo tiene fines de divulgación y no reemplaza una consulta profesional. Si estás atravesando una situación de riesgo, comunicate con el 911 o con el Centro de Asistencia al Suicida (135 desde CABA y GBA; 0800-345-1435 desde todo el país).</p></div>
  {bloque_compartir(a["titulo"], a["ruta"])}
  {relacionados(a)}
  <div class="autor-caja">{SIMBOLO.replace('class="marca__simbolo"', '')}<p><strong>{esc(NOMBRE_COMPLETO)}</strong><br>Psicólogo clínico, {esc(C["matricula"])}. Más de 15 años de práctica, con orientación junguiana, base psicoanalítica y perspectiva integrativa. <a href="/sobre-mi/">Conocé más sobre mí</a>.</p></div>
  <div style="margin-top:3rem">{bloque_cta("Si este texto te resonó, <em>podemos conversarlo</em>", ubicacion="articulo")}</div>
</div>
</article>'''
    meta = {
        "titulo": a.get("titulo_seo", a["titulo"]) , "descripcion": a["descripcion"], "migas": migas,
        "noindex": not a["publicado"], "con_consultorio": False, "og": og, "faq_items": faq_items,
        "articulo": {"fecha": a.get("fecha", HOY)},
        "schema_extra": [{
            "@type": "Article", "@id": f'{URL}{a["ruta"]}#articulo', "headline": a["titulo"], "description": a["descripcion"],
            "inLanguage": C["idioma"], "datePublished": a.get("fecha", HOY), "dateModified": a.get("fecha", HOY),
            "author": {"@id": f"{URL}/#nicolas-bongiorno"}, "publisher": {"@id": f"{URL}/#nicolas-bongiorno"},
            "mainEntityOfPage": f'{URL}{a["ruta"]}', "articleSection": a["categoria"],
            "image": f"{URL}/assets/img/{og}", "keywords": a.get("palabras_clave", ""),
            **({"mentions": menciones, "about": menciones[0]} if menciones else {}),
            "isPartOf": {"@id": f'{URL}{ruta_categoria(a["categoria"])}#pagina'},
        }],
        "revisado": a.get("revision", a.get("fecha", HOY)),
    }
    return meta, cuerpo


# --------------------------------------------------------------------------- render de páginas
def reemplazos(cuerpo, ruta):
    parciales = {
        "motivos": lambda: bloque_motivos(),
        "motivos_6": lambda: bloque_motivos(6),
        "faq": lambda: bloque_faq(),
        "faq_inicio": lambda: bloque_faq(["necesito-terapia", "primera-sesion", "obra-social", "terapia-online", "otro-pais", "como-solicitar"]),
        "faq_online": lambda: bloque_faq(["terapia-online", "otro-pais", "online-vs-presencial"]),
        "faq_jung": lambda: bloque_faq(["que-es-terapia-junguiana", "suenos", "psicoanalisis-diferencia", "terapia-online"]),
        "faq_primera": lambda: bloque_faq(["nunca-hice-terapia", "primera-sesion", "obra-social", "como-solicitar", "confidencialidad"]),
        "faq_alta_gracia": lambda: bloque_faq(["primera-sesion", "duracion", "obra-social", "adolescentes", "como-solicitar"]),
        "resenas": bloque_resenas,
        "cta": lambda: bloque_cta(),
        "cta_motivos": lambda: bloque_cta("Si te reconocés en alguno de estos temas, <em>no tenés que esperar</em> a que empeore", ubicacion="motivos", suave=True),
        "cta_modalidades": lambda: bloque_cta("Elegí la modalidad que <em>mejor se adapte</em> a tu vida", ubicacion="modalidades", suave=True),
        "umbral": umbral,
        "retrato": retrato,
        "retrato_lectura": lambda: retrato(cual="foto_lectura"),
        "retrato_sobre_mi": lambda: retrato(cual="foto_sobre_mi"),
        "retrato_biblioteca": lambda: retrato(cual="foto_biblioteca"),
        "orbitas": orbitas_svg,
        "arte_hero": lambda: ARTE_HERO,
        "deco_enso": lambda: DECO_ENSO,
        "simbolo": lambda: SIMBOLO,
        "articulos": lambda: articulos_lista(),
        "articulos_3": lambda: articulos_lista(limite=3),
        "opiniones": bloque_opiniones,
        "categorias": lambda: '<ul class="categorias categorias--enlaces" aria-label="Categorías">' + "".join(
            f'<li><a href="{ruta_categoria(c)}">{esc(c)}</a></li>' for c in CATEGORIAS
            if any(x["categoria"] == c and (x["publicado"] or BORRADORES) for x in ARTICULOS)) + "</ul>",
        "asistente": bloque_asistente,
        "disponibilidad": lambda: ('<p class="disponibilidad entra"><span class="disponibilidad__punto" aria-hidden="true"></span>Recibiendo nuevas consultas · presencial y online</p>' if C.get("recibiendo_consultas") else ""),
        "glosario": bloque_glosario,
        "datos_clave": bloque_datos_clave,
        "avatar": lambda: (f'<img class="hero__avatar" src="/{C["foto_chica"]}" alt="" width="56" height="70" decoding="async">' if C.get("foto_chica") else ""),
        "redes": redes_html,
    }
    cuerpo = re.sub(r"\{\{>\s*(\w+)\s*\}\}", lambda m: parciales[m.group(1)](), cuerpo)
    valores = {
        "wa_url": wa(), "wa_visible": C["whatsapp_visible"], "matricula": C["matricula"], "universidad": C["universidad"],
        "facultad": C["facultad"], "calle": D["calle"], "localidad": D["localidad"], "provincia": D["provincia"],
        "maps_url": D["maps_url"], "instagram": R["instagram"], "instagram_usuario": R["instagram_usuario"],
        "facebook": R["facebook"], "linkedin": R["linkedin"], "doctoralia": R["doctoralia"], "nombre": NOMBRE_COMPLETO,
        "centro_sinapsis": C["centro_sinapsis"], "url": URL, "email": C.get("email", ""),
        "wa_online": wa("Hola, Nicolás. Te escribo desde tu web: me interesa la terapia online."),
        "wa_presencial": wa("Hola, Nicolás. Te escribo desde tu web: me interesa la atención presencial en Alta Gracia."),
        "wa_exterior": wa("Hola, Nicolás. Te escribo desde tu web. Vivo fuera de Argentina y me interesa la terapia online."),
    }
    for icono, svg in ICON.items():
        valores[f"icono_{icono.replace('-', '_')}"] = svg
    return re.sub(r"\{\{\s*(\w+)\s*\}\}", lambda m: str(valores[m.group(1)]), cuerpo)


def leer_pagina(f):
    txt = f.read_text(encoding="utf-8")
    m = re.match(r"\s*<!--(\{.*?\})-->\s*", txt, re.S)
    meta = json.loads(m.group(1))
    return meta, txt[m.end():]


VERSION = hashlib.md5((RAIZ / "assets/css/estilos.css").read_bytes() + (RAIZ / "assets/css/oscuro.plantilla.css").read_bytes() + (RAIZ / "assets/js/sitio.js").read_bytes()).hexdigest()[:8]


def escribir(ruta, contenido):
    destino = SALIDA / ruta.strip("/") / "index.html" if ruta.endswith("/") and ruta != "/" else (
        SALIDA / "index.html" if ruta == "/" else SALIDA / ruta.strip("/"))
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(contenido, encoding="utf-8")


def construir():
    if SALIDA.exists():
        shutil.rmtree(SALIDA)
    SALIDA.mkdir()
    shutil.copytree(RAIZ / "assets", SALIDA / "assets")
    css_pub = SALIDA / "assets/css/estilos.css"
    plantilla = (RAIZ / "assets/css/oscuro.plantilla.css").read_text(encoding="utf-8")
    plantilla = re.sub(r"/\*.*?\*/", "", plantilla, flags=re.S)
    oscuro = ("@media (prefers-color-scheme: dark) {" + plantilla.replace("TEMA", ':root:not([data-tema="claro"])') + "}\n"
              + plantilla.replace("TEMA", ':root[data-tema="oscuro"]'))
    css_pub.write_text(minificar_css(css_pub.read_text(encoding="utf-8") + "\n" + oscuro), encoding="utf-8")
    (SALIDA / "assets/css/oscuro.plantilla.css").unlink()
    for extra in ("favicon.svg", "favicon.ico", "apple-touch-icon.png"):
        origen = RAIZ / "assets/img" / extra
        if origen.exists():
            shutil.copy(origen, SALIDA / extra)

    mapa = []  # (ruta, prioridad, frecuencia)
    nombres = {}  # ruta -> nombre legible (mapa del sitio para personas)
    fechas = {}   # ruta -> última modificación
    imagenes = {}  # ruta -> imagen principal
    for f in sorted((CONTENIDO / "paginas").glob("*.html")):
        meta, cuerpo = leer_pagina(f)
        ruta = meta["ruta"]
        og_pag = f'og/pagina-{ruta.strip("/").replace("/", "-")}.jpg'
        if "og" not in meta and (RAIZ / "assets/img" / og_pag).exists():
            meta["og"] = og_pag
        if meta.get("articulos"):
            cuerpo += leer_mas(meta["articulos"])
        nombres[ruta] = re.sub(r"<[^>]+>", "", meta.get("h1", meta["titulo"]))
        fechas[ruta] = meta.get("modificado", HOY)
        imagenes[ruta] = meta.get("og", "og-inicio.jpg")
        if meta.get("portada", True) and "h1" in meta:
            cuerpo = portada(meta, meta.get("portada_extra", "")) + cuerpo
        html_final = pagina(meta, reemplazos(cuerpo, ruta), ruta)
        if meta.get("wa_tema"):
            html_final = html_final.replace(wa(), wa(f'Hola, Nicolás. Te escribo desde tu web por {meta["wa_tema"]}. Quería consultarte por un turno.'))
        if ruta == "/404.html":
            (SALIDA / "404.html").write_text(html_final, encoding="utf-8")
            continue
        escribir(ruta, html_final)
        if not meta.get("noindex"):
            mapa.append((ruta, meta.get("prioridad", 0.7), meta.get("frecuencia", "monthly")))

    for a in ARTICULOS:
        if not a["publicado"] and not BORRADORES:
            continue
        meta, cuerpo = render_articulo(a)
        html_a = pagina(meta, reemplazos(cuerpo, a["ruta"]), a["ruta"])
        html_a = html_a.replace(wa(), wa(f'Hola, Nicolás. Leí tu artículo «{a["titulo"]}» y quería consultarte por un turno.'))
        escribir(a["ruta"], html_a)
        if a["publicado"]:
            mapa.append((a["ruta"], 0.6, "yearly"))
            nombres[a["ruta"]] = a["titulo"]
            fechas[a["ruta"]] = a.get("revision", a.get("fecha", HOY))
            imagenes[a["ruta"]] = meta["og"]

    # Páginas por categoría de artículos
    visibles = [a for a in ARTICULOS if a["publicado"] or BORRADORES]
    cats_con = [c for c in CATEGORIAS if any(a["categoria"] == c for a in visibles)]
    for cat in cats_con:
        ruta = ruta_categoria(cat)
        meta = {"titulo": f"{cat} | Recursos de Nicolás Bongiorno"[:65], "descripcion": CATEGORIAS[cat],
                "migas": [("Recursos", "/recursos/"), (cat, ruta)], "tipo_pagina": "CollectionPage", "con_consultorio": False,
                "antetitulo": "Recursos", "h1": esc(cat), "bajada": esc(CATEGORIAS[cat])}
        otras = "".join(f'<li><a href="{ruta_categoria(c)}">{esc(c)}</a></li>' for c in cats_con if c != cat)
        cuerpo = portada(meta) + f'''<section class="seccion" style="padding-top:0"><div class="contenedor">
<h2 class="visualmente-oculto">Artículos</h2>
{articulos_lista(categoria=cat)}
<p style="margin-top:3rem;font-family:var(--f-sans);font-size:.9rem">Otras categorías:</p><ul class="indice-enfoques">{otras}<li><a href="/recursos/">Todos los artículos</a></li></ul>
<div style="margin-top:var(--sec)">{bloque_cta()}</div></div></section>'''
        escribir(ruta, pagina(meta, reemplazos(cuerpo, ruta), ruta))
        mapa.append((ruta, 0.5, "monthly"))
        nombres[ruta] = cat

    # IndexNow (Bing y otros): archivo de verificación de la clave
    if C.get("indexnow_key"):
        (SALIDA / f'{C["indexnow_key"]}.txt').write_text(C["indexnow_key"], encoding="utf-8")

    # Mapa del sitio para personas
    grupos = [
        ("El espacio", ["/", "/sobre-mi/", "/terapia-junguiana/", "/enfoque/", "/glosario-junguiano/", "/opiniones/"]),
        ("Empezar", ["/primera-consulta/", "/preguntas-frecuentes/", "/contacto/", "/ayuda-urgente/"]),
        ("Modalidades", ["/psicologo-alta-gracia/", "/psicologo-valle-de-paravachasca/", "/terapia-online/", "/terapia-online-por-pais/"]),
        ("Para quién", ["/psicologo-para-adolescentes/", "/terapia-para-adultos-mayores/"]),
        ("Motivos de consulta", ["/motivos-de-consulta/"] + [r for r, _, _ in mapa if r in (
            "/ansiedad-y-ataques-de-panico/", "/depresion/", "/estres-y-agotamiento/", "/duelo-y-perdidas/", "/crisis-vitales/",
            "/autoestima/", "/dificultades-vinculares/", "/trauma/")]),
        ("Recursos", ["/recursos/"] + [ruta_categoria(c) for c in cats_con]),
        ("Artículos", [a["ruta"] for a in ARTICULOS if a["publicado"] or BORRADORES]),
    ]
    bloques_mapa = "".join(
        f'<section class="mapa-grupo"><h2>{esc(t)}</h2><ul>' + "".join(
            f'<li><a href="{r}">{esc(nombres.get(r, "Inicio" if r == "/" else r))}</a></li>' for r in rs if r in nombres or r == "/") + "</ul></section>"
        for t, rs in grupos)
    nombres["/"] = "Inicio"
    meta_mapa = {"titulo": "Mapa del sitio | Lic. Nicolás Bongiorno, psicólogo", "descripcion": "Todas las páginas del sitio del Lic. Nicolás Raúl Bongiorno: enfoque, motivos de consulta, modalidades, recursos y artículos.",
                 "migas": [("Mapa del sitio", "/mapa-del-sitio/")], "con_consultorio": False, "antetitulo": "Navegación", "h1": "Mapa del <em>sitio</em>",
                 "bajada": "Todas las páginas, ordenadas por tema."}
    cuerpo_mapa = portada(meta_mapa) + f'<section class="seccion" style="padding-top:0"><div class="contenedor mapa-sitio">{bloques_mapa}</div></section>'
    escribir("/mapa-del-sitio/", pagina(meta_mapa, reemplazos(cuerpo_mapa, "/mapa-del-sitio/"), "/mapa-del-sitio/"))
    mapa.append(("/mapa-del-sitio/", 0.3, "monthly"))

    # sitemap.xml (con fecha de modificación por página e imagen principal)
    urls = "\n".join(
        f"  <url><loc>{URL}{r}</loc><lastmod>{fechas.get(r, HOY)}</lastmod><changefreq>{fr}</changefreq><priority>{p}</priority>"
        f"<image:image><image:loc>{URL}/assets/img/{imagenes.get(r, 'og-inicio.jpg')}</image:loc></image:image></url>"
        for r, p, fr in mapa)
    (SALIDA / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        f'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n{{urls}}\n</urlset>\n'.replace("{urls}", urls), encoding="utf-8")

    # robots.txt (se permite explícitamente a buscadores y asistentes de IA)
    (SALIDA / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n"
        "# Asistentes y motores de respuesta: bienvenidos a leer este sitio público.\n"
        "User-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\n"
        "User-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\n"
        f"Sitemap: {URL}/sitemap.xml\n", encoding="utf-8")

    # llms.txt (GEO): resumen factual y verificable para motores de respuesta
    publicados = [a for a in ARTICULOS if a["publicado"]]
    lineas_art = "\n".join(f'- [{a["titulo"]}]({URL}{a["ruta"]}): {a["resumen"]}' for a in publicados) or "- (Artículos en preparación.)"
    motivos_txt = ", ".join(m["titulo"].lower() for m in MOTIVOS)
    (SALIDA / "llms.txt").write_text(f"""# {NOMBRE_COMPLETO} — Psicólogo clínico ({C["matricula"]})

> Psicólogo clínico egresado de la {C["facultad"]} de la {C["universidad"]}, con {C["anios_experiencia"]} de práctica clínica. Orientación junguiana (psicología analítica de C. G. Jung) con base psicoanalítica y perspectiva integrativa. Atiende adolescentes, adultos y adultos mayores, de forma presencial en {D["localidad"]} ({D["provincia"]}, Argentina) y online por videollamada, en español.

## Datos verificables
- Nombre: {C["nombre"]} (también: Nicolás Bongiorno, Lic. Nicolás Bongiorno).
- Profesión: {C["profesion"]}. Matrícula profesional {C["matricula"]}, {C["matricula_entidad"]}.
- Formación de grado: Licenciatura en Psicología, {C["facultad"]}, {C["universidad"]}.
- Consultorio presencial: {D["calle"]}, {D["localidad"]}, {D["provincia"]}, Argentina. Mapa: {D["maps_url"]}
- Modalidad online: videollamada, para personas de otras localidades, provincias o países que puedan sostener un proceso en español.
- Población: adolescentes, adultos y adultos mayores.
- Obras sociales: no atiende a través de obras sociales ni prepagas; trabaja con reintegro (el paciente abona la sesión y recibe una factura con los datos que pide su cobertura para solicitar el reintegro).
- Contacto: WhatsApp {C["whatsapp_visible"]} ({WA_BASE}). Formulario: {URL}/contacto/
- Redes: Instagram {R["instagram"]} · Facebook {R["facebook"]} · LinkedIn {R["linkedin"]}
- Opiniones de pacientes: más de 100 reseñas en Google y 80 en Doctoralia ({R["doctoralia"]}). Selección: {URL}/opiniones/
- También integra el equipo de Centro Sinapsis (Berazategui), con atención online: {C["centro_sinapsis"]}

## Enfoque
El eje de su trabajo es la psicología analítica de C. G. Jung (terapia de orientación junguiana: sueños, símbolos, sombra, proceso de individuación), sobre una base psicoanalítica y psicodinámica. Desde una perspectiva integrativa, dialoga con la terapia sistémica, la Gestalt y la terapia cognitivo-conductual, y toma recursos de otros marcos cuando son pertinentes. Estas corrientes son marcos teóricos de referencia: no se presentan como especializaciones ni certificaciones.

## Motivos de consulta que aborda
{motivos_txt}.

## Páginas principales
- [Inicio]({URL}/)
- [Sobre mí]({URL}/sobre-mi/)
- [Terapia junguiana]({URL}/terapia-junguiana/)
- [Enfoque terapéutico]({URL}/enfoque/)
- [Glosario junguiano]({URL}/glosario-junguiano/)
- [Ansiedad y ataques de pánico]({URL}/ansiedad-y-ataques-de-panico/)
- [Duelo y pérdidas]({URL}/duelo-y-perdidas/)
- [Crisis vitales y de la mitad de la vida]({URL}/crisis-vitales/)
- [Autoestima]({URL}/autoestima/)
- [Dificultades vinculares]({URL}/dificultades-vinculares/)
- [Depresión]({URL}/depresion/)
- [Estrés y agotamiento]({URL}/estres-y-agotamiento/)
- [Trauma y regulación emocional]({URL}/trauma/)
- [Psicólogo para adolescentes]({URL}/psicologo-para-adolescentes/)
- [Terapia para adultos mayores]({URL}/terapia-para-adultos-mayores/)
- [Valle de Paravachasca]({URL}/psicologo-valle-de-paravachasca/)
- [Terapia online por país]({URL}/terapia-online-por-pais/)
- [Tu primera consulta]({URL}/primera-consulta/)
- [Opiniones de pacientes]({URL}/opiniones/)
- [Motivos de consulta]({URL}/motivos-de-consulta/)
- [Psicólogo en Alta Gracia]({URL}/psicologo-alta-gracia/)
- [Terapia online en español]({URL}/terapia-online/)
- [Preguntas frecuentes]({URL}/preguntas-frecuentes/)
- [Contacto]({URL}/contacto/)

## Artículos
{lineas_art}

## Texto completo
- {URL}/llms-full.txt (todas las páginas en texto plano)
- {URL}/recursos/feed.xml (RSS de artículos)

## Límites
No atiende urgencias ni emergencias. En Argentina: 911, o Centro de Asistencia al Suicida 135 (CABA y GBA) / 0800-345-1435 (todo el país).
Última actualización: {HOY}.
""", encoding="utf-8")

    # RSS de artículos publicados
    from email.utils import format_datetime
    from datetime import datetime, timezone
    def fecha_rss(f):
        y, m, d = (int(x) for x in f.split("-"))
        return format_datetime(datetime(y, m, d, 12, tzinfo=timezone.utc))
    items = "".join(
        f"<item><title>{esc(a['titulo'])}</title><link>{URL}{a['ruta']}</link><guid>{URL}{a['ruta']}</guid>"
        f"<pubDate>{fecha_rss(a.get('fecha', HOY))}</pubDate><category>{esc(a['categoria'])}</category>"
        f"<description>{esc(a['descripcion'])}</description></item>" for a in publicados)
    (SALIDA / "recursos").mkdir(exist_ok=True)
    (SALIDA / "recursos" / "feed.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>'
        f'<title>Recursos · Lic. Nicolás Bongiorno</title><link>{URL}/recursos/</link>'
        f'<atom:link href="{URL}/recursos/feed.xml" rel="self" type="application/rss+xml"/>'
        '<description>Divulgación sobre psicología analítica, emociones, vínculos y autoconocimiento.</description>'
        f'<language>es-ar</language><lastBuildDate>{fecha_rss(HOY)}</lastBuildDate>{items}</channel></rss>\n', encoding="utf-8")

    # llms-full.txt: el texto completo de cada página indexable, para motores de respuesta
    bloques = []
    for ruta, _, _ in mapa:
        f = SALIDA / ("index.html" if ruta == "/" else ruta.strip("/") + "/index.html")
        h = f.read_text(encoding="utf-8")
        titulo = re.search(r"<title>(.*?)</title>", h).group(1)
        cuerpo = re.search(r'<main id="contenido">(.*?)</main>', h, re.S).group(1)
        cuerpo = re.sub(r"<(svg|script|style|nav|button)\b.*?</\1>", " ", cuerpo, flags=re.S)
        cuerpo = re.sub(r"</(p|h[1-6]|li|dt|dd|blockquote|figcaption|summary)>", "\n", cuerpo)
        cuerpo = html.unescape(re.sub(r"<[^>]+>", " ", cuerpo))
        cuerpo = "\n".join(re.sub(r"[ \t]+", " ", l).strip() for l in cuerpo.splitlines())
        cuerpo = re.sub(r"\n{2,}", "\n", cuerpo).strip()
        bloques.append(f"# {html.unescape(titulo)}\nURL: {URL}{ruta}\n\n{cuerpo}\n")
    (SALIDA / "llms-full.txt").write_text(
        f"# {NOMBRE_COMPLETO} — texto completo del sitio\n> Generado el {HOY}. Resumen breve: {URL}/llms.txt\n\n" + "\n---\n\n".join(bloques), encoding="utf-8")

    # Manifest
    (SALIDA / "manifest.webmanifest").write_text(json.dumps({
        "name": "Nicolás Bongiorno · Psicólogo clínico", "short_name": "N. Bongiorno", "lang": C["idioma"], "start_url": "/",
        "display": "browser", "background_color": "#F6F1EB", "theme_color": "#F6F1EB",
        "icons": [{"src": "/assets/img/simbolo-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "/assets/img/simbolo-512.png", "sizes": "512x512", "type": "image/png"}]}, ensure_ascii=False, indent=1), encoding="utf-8")

    # Cabeceras de seguridad y caché: Vercel (vercel.json) y Netlify / Cloudflare Pages (_headers)
    seguridad = {
        "Content-Security-Policy": csp(),
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "X-Frame-Options": "DENY",
        "Cross-Origin-Opener-Policy": "same-origin",
    }
    vercel = {
        "cleanUrls": True, "trailingSlash": True,
        "headers": [
            {"source": "/(.*)", "headers": [{"key": k, "value": v} for k, v in seguridad.items()]},
            {"source": "/assets/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}]},
        ],
    }
    (SALIDA / "vercel.json").write_text(json.dumps(vercel, ensure_ascii=False, indent=2), encoding="utf-8")
    # Copia en la raíz del proyecto: si en Vercel el "Root Directory" quedó en la raíz del repositorio,
    # esta configuración le indica que publique la carpeta public/ sin compilar nada.
    raiz_vercel = {"framework": None, "buildCommand": "", "installCommand": "", "outputDirectory": "public", **vercel}
    (RAIZ / "vercel.json").write_text(json.dumps(raiz_vercel, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (SALIDA / "_headers").write_text(
        "/*\n" + "".join(f"  {k}: {v}\n" for k, v in seguridad.items()) +
        "\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n", encoding="utf-8")

    print(f"Listo: {len(mapa)} URL indexables en {SALIDA.relative_to(RAIZ.parent)}/ "
          f"({'con' if BORRADORES else 'sin'} borradores, versión de assets {VERSION}).")


if __name__ == "__main__":
    construir()
