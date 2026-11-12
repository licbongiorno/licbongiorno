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

REGLAS_ESPECULACION = json.dumps({"prerender": [{"source": "document", "where": {"and": [
    {"href_matches": "/*"}, {"not": {"href_matches": "/assets/*"}}, {"not": {"selector_matches": "[target=_blank]"}}]},
    "eagerness": "moderate"}]}, separators=(",", ":"))

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
    "estrella": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>',
    "calendario": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M8 13.5h2M14 13.5h2M8 16.5h2"/></svg>',
    "birrete": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8V11"/><path d="M21.5 9v5"/></svg>',
    "credencial": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.8 16c.6-1.4 1.6-2 2.7-2s2.1.6 2.7 2M14 10h4M14 13.5h3"/></svg>',
    "telefono": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/></svg>',
    "globo": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5s1.1-6 3.5-8.5z"/></svg>',
    "palabra": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z"/><path d="M8 10.5h8"/></svg>',
    "espiral": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12c0-1 1.5-1.5 2-.5s-.5 2.5-2 2.5-3-1.5-3-3.5 2-4 4.5-4S18 8.5 18 12s-3 6-6 6-7-2.5-7-7 3.5-8 7-8"/></svg>',
    "marco": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19V9a7 7 0 0 1 14 0v10z"/><path d="M3.5 19h17"/></svg>',
    "arriba": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 18V6M6.5 11.5 12 6l5.5 5.5"/></svg>',
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
    anillo2 = [("Humanista", -45), ("Logoterapia", 15), ("Mindfulness", 60), ("ACT · DBT", 120), ("Transpersonal", 140), ("Psicología positiva", 222), ("Contextuales", 255)]
    partes = ['<svg viewBox="0 0 600 600" role="img" aria-labelledby="orb-t orb-d">',
              '<title id="orb-t">Perspectiva integrativa</title>',
              '<desc id="orb-d">En el centro, la psicología analítica de C. G. Jung como eje clínico. '
              'Alrededor, la base psicoanalítica y los marcos con los que dialogo: terapia sistémica, Gestalt y cognitivo-conductual. '
              'En el anillo exterior, recursos y lecturas: humanista, logoterapia, mindfulness, ACT y DBT, transpersonal, psicología positiva y terapias contextuales.</desc>',
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


# Figuras estáticas para artículos: contenido/figuras/<nombre>.svg + figuras.json (título, descripción, enlace).
FIGURAS = json.loads((RAIZ / "contenido/figuras/figuras.json").read_text(encoding="utf-8")) if (RAIZ / "contenido/figuras/figuras.json").exists() else {}


def figura_html(nombre):
    m = FIGURAS.get(nombre)
    svg_path = RAIZ / "contenido/figuras" / f"{nombre}.svg"
    if not m or not svg_path.exists():
        raise SystemExit(f"Falta la figura «{nombre}» en contenido/figuras/")
    svg = svg_path.read_text(encoding="utf-8").strip()
    fid = f"fig-{nombre}"
    svg = svg.replace("<svg ", f'<svg role="img" aria-labelledby="{fid}-t {fid}-d" ', 1)
    svg = svg.replace(">", f'><title id="{fid}-t">{esc(m["titulo"])}</title>', 1)
    enlace = f'<a class="enlace-flecha" href="{m["enlace"][1]}">{esc(m["enlace"][0])} {ICON["flecha"]}</a>' if m.get("enlace") else ""
    return (f'<figure class="figura-articulo escena revelar" id="{fid}">{svg}'
            f'<figcaption><p id="{fid}-d">{esc(m["desc"])}</p>{enlace}</figcaption></figure>')


# --------------------------------------------------------------------------- mapa de autores
MAPA = json.loads((RAIZ / "contenido/mapa_autores.json").read_text(encoding="utf-8")) if (RAIZ / "contenido/mapa_autores.json").exists() else None
MAPA_RUTA = "/recursos/mapa-de-la-psicologia/"


def _mapa_nombres():
    nombres = {}
    for a in MAPA["autores"]:
        f = RAIZ / "contenido/blog" / f'{a["slug"]}.md'
        if not f.exists():
            raise SystemExit(f"Mapa de autores: falta el artículo {a['slug']}")
        m = re.search(r"^titulo:\s*(.+)$", f.read_text(encoding="utf-8"), re.M)
        nombres[a["slug"]] = m.group(1).split(":")[0].strip()
    ids = set(nombres)
    for r in MAPA["relaciones"]:
        if r["de"] not in ids or r["a"] not in ids:
            raise SystemExit(f"Mapa de autores: relación con un autor inexistente: {r}")
    return nombres


MAPA_NOMBRES = _mapa_nombres() if MAPA else {}
MAPA_ESCUELAS = {e["id"]: e["nombre"] for e in MAPA["escuelas"]} if MAPA else {}


def _mapa_vinculos(slug):
    """Devuelve (recibió, influyó, diálogo): listas de (slug, tipo, nota)."""
    recibio, influyo, dialogo = [], [], []
    for r in MAPA["relaciones"]:
        simetrica = r["tipo"] in ("dialogo", "colaboracion")
        if r["a"] == slug:
            (dialogo if simetrica else recibio).append((r["de"], r["tipo"], r["nota"]))
        elif r["de"] == slug:
            (dialogo if simetrica else influyo).append((r["a"], r["tipo"], r["nota"]))
    return recibio, influyo, dialogo


def _mapa_lista(items):
    return ", ".join(f'<a href="/recursos/{s}/">{esc(MAPA_NOMBRES[s])}</a> <span class="mapa-nota">({esc(n)})</span>' for s, t, n in items)


MAPA_FRASES = {"fil": "la filosofía", "ori": "las tradiciones orientales", "cor": "la psicología corporal", "trans": "la psicología transpersonal", "ini": "los comienzos de la psicología científica", "pa": "el psicoanálisis", "rio": "el psicoanálisis rioplatense", "jung": "la psicología analítica",
               "hum": "la psicología humanista y existencial", "ges": "la Gestalt y el análisis transaccional",
               "cc": "las corrientes conductuales y cognitivas", "sis": "la terapia sistémica", "des": "la psicología del desarrollo y el apego"}


def _mapa_trayectoria(a):
    if a.get("origen"):
        return esc(("de " + MAPA_FRASES[a["origen"]]).replace("de el ", "del ") + (" a " + MAPA_FRASES[a["escuela"]]).replace(" a el ", " al "))
    return esc(MAPA_ESCUELAS[a["escuela"]])


def _mapa_relaciones_html(slug):
    recibio, influyo, dialogo = _mapa_vinculos(slug)
    filas = []
    if recibio:
        filas.append(f'<p><span class="mapa-etiqueta">Recibió influencia de</span> {_mapa_lista(recibio)}</p>')
    if influyo:
        filas.append(f'<p><span class="mapa-etiqueta">Influyó en</span> {_mapa_lista(influyo)}</p>')
    if dialogo:
        filas.append(f'<p><span class="mapa-etiqueta">En diálogo con</span> {_mapa_lista(dialogo)}</p>')
    return "".join(filas)


def mapa_autores_svg():
    ancho, x0, anio0, escala = 1760, 570, 1826, 9.5
    fila_alto, fila_ancho_letra = 26, 7.6
    antes = sorted([a for a in MAPA["autores"] if a["x"] < anio0], key=lambda a: a["x"])
    pos_antes = {a["slug"]: 40 + i * (470 / max(1, len(antes) - 1)) for i, a in enumerate(antes)}
    def px(anio, slug=None):
        if slug in pos_antes:
            return pos_antes[slug]
        return x0 + (anio - anio0) * escala
    # Ubicación: por carril, filas para que los nombres no se pisen
    pos, carriles, y = {}, [], 46
    for e in MAPA["escuelas"]:
        autores = sorted([a for a in MAPA["autores"] if a["escuela"] == e["id"]], key=lambda a: a["x"])
        fin_fila = []
        for a in autores:
            x = px(a["x"], a["slug"])
            fila = next((i for i, f in enumerate(fin_fila) if x > f + 10), None)
            if fila is None:
                fila = len(fin_fila); fin_fila.append(0)
            fin_fila[fila] = x + 14 + len(a["corto"]) * fila_ancho_letra
            pos[a["slug"]] = (x, fila)
        alto = 30 + max(1, len(fin_fila)) * fila_alto
        carriles.append((e, y, alto))
        for a in autores:
            x, fila = pos[a["slug"]]
            pos[a["slug"]] = (x, y + 30 + fila * fila_alto)
        y += alto + 8
    alto_total = y + 10
    carril_y = {e["id"]: yy for e, yy, h in carriles}
    p = [f'<svg class="mapa__svg" viewBox="0 0 {ancho} {alto_total}" aria-labelledby="mapa-t mapa-d" data-mapa>',
         '<title id="mapa-t">Mapa de la psicología</title>',
         '<desc id="mapa-d">Los autores de la serie ubicados por año de nacimiento y por escuela, con las influencias, formaciones, rupturas y diálogos entre ellos. Cada nombre lleva a su artículo. Debajo del mapa está el mismo contenido como índice.</desc>',
         '<defs><marker id="mapa-flecha" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="mapa-flecha"/></marker></defs>']
    for i, (e, yy, h) in enumerate(carriles):
        p.append(f'<g class="mapa-carril" data-escuela="{e["id"]}"><rect x="0" y="{yy}" width="{ancho}" height="{h}" rx="10" class="mapa-carril__fondo mapa-carril__fondo--{i % 2}"/>'
                 f'<text x="16" y="{yy + 20}" class="mapa-carril__nombre">{esc(e["nombre"])}</text></g>')
    if antes:
        p.append(f'<text x="{(40 + 510) / 2:.0f}" y="28" text-anchor="middle" class="mapa-anio">antes de 1830</text>'
                 f'<line x1="545" y1="36" x2="545" y2="{alto_total - 10}" class="mapa-guia mapa-guia--corte"/>')
    for d in range(1830, 1960, 10):
        p.append(f'<text x="{px(d):.0f}" y="28" text-anchor="middle" class="mapa-anio">{d}</text>'
                 f'<line x1="{px(d):.0f}" y1="36" x2="{px(d):.0f}" y2="{alto_total - 10}" class="mapa-guia"/>')
    # Trayectorias (de una escuela a otra)
    for a in MAPA["autores"]:
        if a.get("origen"):
            x, yn = pos[a["slug"]]
            yo = carril_y[a["origen"]] + 14
            p.append(f'<g class="mapa-trayectoria" data-id="{a["slug"]}"><circle cx="{x:.0f}" cy="{yo}" r="4" class="mapa-fantasma"/>'
                     f'<path d="M{x:.0f} {yo} V {yn}" class="mapa-trayectoria__linea"/></g>')
    # Relaciones, en orden cronológico
    rel = sorted(MAPA["relaciones"], key=lambda r: max(next(a["x"] for a in MAPA["autores"] if a["slug"] == r["de"]),
                                                       next(a["x"] for a in MAPA["autores"] if a["slug"] == r["a"])))
    for i, r in enumerate(rel):
        x1, y1 = pos[r["de"]]; x2, y2 = pos[r["a"]]
        if abs(y1 - y2) < 1:
            d = f'M{x1:.0f} {y1} Q {(x1 + x2) / 2:.0f} {y1 - 34} {x2:.0f} {y2}'
        else:
            ym = (y1 + y2) / 2
            d = f'M{x1:.0f} {y1} C {x1:.0f} {ym:.0f}, {x2:.0f} {ym:.0f}, {x2:.0f} {y2}'
        flecha = '' if r["tipo"] in ("dialogo", "colaboracion") else ' marker-end="url(#mapa-flecha)"'
        p.append(f'<path d="{d}" class="mapa-rel mapa-rel--{r["tipo"]}" data-de="{r["de"]}" data-a="{r["a"]}" data-tipo="{r["tipo"]}" style="--i:{i}"{flecha}><title>{esc(MAPA_NOMBRES[r["de"]])} → {esc(MAPA_NOMBRES[r["a"]])}: {esc(r["nota"])}</title></path>')
    # Nodos
    for a in MAPA["autores"]:
        x, yn = pos[a["slug"]]
        p.append(f'<a class="mapa-nodo" href="/recursos/{a["slug"]}/" data-id="{a["slug"]}" data-escuela="{a["escuela"]}" '
                 f'aria-label="{esc(MAPA_NOMBRES[a["slug"]])}, {esc(a["anios"])}, {esc(MAPA_ESCUELAS[a["escuela"]])}">'
                 f'<circle cx="{x:.0f}" cy="{yn}" r="7" class="mapa-nodo__punto mapa-nodo__punto--{a["escuela"]}"/>'
                 f'<text x="{x + 12:.0f}" y="{yn + 5}" class="mapa-nodo__nombre">{esc(a["corto"])}</text></a>')
    p.append("</svg>")
    filtros_esc = "".join(f'<button class="mapa-chip" type="button" data-filtro-escuela="{e["id"]}" aria-pressed="false">{esc(e["nombre"])}</button>' for e in MAPA["escuelas"])
    filtros_tipo = "".join(f'<button class="mapa-chip mapa-chip--tipo mapa-chip--{k}" type="button" data-filtro-tipo="{k}" aria-pressed="true"><span class="mapa-chip__muestra" aria-hidden="true"></span>{esc(v)}</button>' for k, v in MAPA["tipos"].items())
    return (f'<div class="mapa revelar">'
            f'<div class="mapa__filtros" role="group" aria-label="Filtrar por escuela"><button class="mapa-chip" type="button" data-filtro-escuela="" aria-pressed="true">Todas</button>{filtros_esc}</div>'
            f'<div class="mapa__filtros mapa__filtros--tipos" role="group" aria-label="Tipos de relación">{filtros_tipo}</div>'
            f'<p class="mapa__aviso">Deslizá para ver todo el mapa. Tocá un nombre para ver sus relaciones.</p>'
            f'<div class="mapa__marco" tabindex="0" role="region" aria-label="Mapa de autores, se puede desplazar">{"".join(p)}</div>'
            f'<div class="mapa__ficha" data-mapa-ficha aria-live="polite" hidden></div>'
            f'</div>')


def indice_autores_html():
    partes = []
    for e in MAPA["escuelas"]:
        autores = sorted([a for a in MAPA["autores"] if a["escuela"] == e["id"]], key=lambda a: a["x"])
        items = "".join(
            f'<li id="autor-{a["slug"]}" class="mapa-indice__autor" data-escuela="{e["id"]}">'
            f'<h3><a href="/recursos/{a["slug"]}/">{esc(MAPA_NOMBRES[a["slug"]])}</a></h3>'
            f'<p class="mapa-indice__datos">{esc(a["anios"])} · {_mapa_trayectoria(a)}</p>'
            f'<p>{esc(a["resumen"])}</p>{_mapa_relaciones_html(a["slug"])}</li>' for a in autores)
        partes.append(f'<section class="mapa-indice__escuela" aria-labelledby="escuela-{e["id"]}"><h2 id="escuela-{e["id"]}">{esc(e["nombre"])}</h2><ul>{items}</ul></section>')
    return f'<div class="mapa-indice">{"".join(partes)}</div>'


def bloque_mapa(slug):
    if not MAPA or slug not in MAPA_NOMBRES:
        return ""
    a = next(x for x in MAPA["autores"] if x["slug"] == slug)
    return (f'<aside class="mapa-caja" aria-label="En el mapa de la psicología"><p class="mapa-caja__titulo">En el mapa de la psicología</p>'
            f'<p class="mapa-indice__datos">{_mapa_trayectoria(a)[:1].upper() + _mapa_trayectoria(a)[1:]}</p>{_mapa_relaciones_html(slug)}'
            f'<a class="enlace-flecha" href="{MAPA_RUTA}#autor-{slug}">Ver en el mapa {ICON["flecha"]}</a></aside>')


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
        mf = re.match(r"^\{\{figura:([a-z0-9-]+)\}\}$", s)
        if mf:
            cerrar(); salida.append(figura_html(mf.group(1))); continue
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
    ("Recursos", None, [
        ("Artículos", "/recursos/", "Psicología para la vida cotidiana"),
        ("Para descargar", "/recursos/#para-descargar", "Diario de sueños en PDF"),
        ("Laboratorios", "/laboratorios/", "Prácticas interactivas para emociones, vínculos y más"),
        ("¿Por dónde empiezo?", "/por-donde-empezar/", "Un recorrido según lo que te pasa"),
        ("Tests", "/tests/", "Autoconocimiento, escalas breves y ejercicios"),
        ("El mapa de lo que me habita", "/el-mapa-de-lo-que-me-habita/", "Un recorrido para pensarte en nueve estaciones"),
        ("Buscar", "/buscar/", "Artículos, laboratorios y preguntas"),
    ]),
    ("Empezar", None, [
        ("Tu primera consulta", "/primera-consulta/", "Paso a paso, sin sorpresas"),
        ("Preguntas frecuentes", "/preguntas-frecuentes/", "Dudas habituales antes de empezar"),
        ("Opiniones de pacientes", "/opiniones/", "Más de 100 reseñas en Google"),
    ]),
]


# Laboratorios de práctica (interactivos). El orden es el de publicación.
LABORATORIOS = [
    {"titulo": "Laboratorio de creatividad", "ruta": "/laboratorio-de-creatividad/", "tipo": "Creatividad",
     "descripcion": "Combinar ideas, usos imposibles, escritura, el juego del garabato, imágenes simbólicas y un plan de 7 días."},
    {"titulo": "Laboratorio de comunicación no violenta", "ruta": "/laboratorio-de-comunicacion-no-violenta/", "tipo": "Vínculos",
     "descripcion": "Distinguir hechos de juicios, nombrar lo que sentís y necesitás, y armar un pedido claro en cuatro pasos."},
    {"titulo": "Laboratorio de habilidades inspiradas en DBT", "ruta": "/laboratorio-de-habilidades-dbt/", "tipo": "Emociones intensas",
     "descripcion": "Atención plena, STOP, kit de crisis, acción opuesta y pedir con claridad: herramientas para cuando la emoción sube."},
    {"titulo": "Laboratorio de flexibilidad yoica", "ruta": "/laboratorio-de-flexibilidad-yoica/", "tipo": "Autoconocimiento",
     "descripcion": "Las tres sillas, otras explicaciones posibles, el diálogo con tus voces internas y tus defensas."},
    {"titulo": "Laboratorio de emociones", "ruta": "/laboratorio-de-emociones/", "tipo": "Emociones",
     "descripcion": "Un mapa para ponerle nombre a lo que sentís, un termómetro de intensidad y un diario emocional."},
    {"titulo": "Laboratorio de presencia", "ruta": "/laboratorio-de-presencia/", "tipo": "Atención plena",
     "descripcion": "Respiración guiada, anclaje 5-4-3-2-1, escaneo corporal y un temporizador con campana."},
    {"titulo": "Laboratorio de sueños", "ruta": "/laboratorio-de-suenos/", "tipo": "Jung",
     "descripcion": "Registrá un sueño, amplificá sus imágenes y dialogá con una de sus figuras, desde la mirada de Jung."},
    {"titulo": "Laboratorio de valores y sentido", "ruta": "/laboratorio-de-valores/", "tipo": "Sentido",
     "descripcion": "Elegí y ordená tus valores, armá tu brújula y tu rueda de la vida."},
    {"titulo": "Laboratorio de aprender a aprender", "ruta": "/laboratorio-de-aprender-a-aprender/", "tipo": "Aprendizaje",
     "descripcion": "Mitos y evidencia, evocación activa, repasos espaciados para tu calendario y una autoevaluación."},
    {"titulo": "Laboratorio de ansiedad y preocupación", "ruta": "/laboratorio-de-ansiedad/", "tipo": "Ansiedad",
     "descripcion": "Preocupación útil o rumiación, descatastrofizar, registro de pensamientos y escalera de exposición."},
    {"titulo": "Laboratorio de autoestima y autocompasión", "ruta": "/laboratorio-de-autocompasion/", "tipo": "Autoestima",
     "descripcion": "Reescribir la voz crítica, una pausa de autocompasión, una carta para vos y un registro de logros."},
    {"titulo": "Laboratorio de vínculos y límites", "ruta": "/laboratorio-de-vinculos/", "tipo": "Vínculos",
     "descripcion": "Tu mapa de vínculos, señales de alarma, cómo decir que no y tu forma de vincularte."},
    {"titulo": "Laboratorio de duelo", "ruta": "/laboratorio-de-duelo/", "tipo": "Pérdidas",
     "descripcion": "El ir y venir del duelo, una carta a quien ya no está, lo que te dejó, rituales y fechas difíciles."},
    {"titulo": "Laboratorio de sombra y arquetipos", "ruta": "/laboratorio-de-sombra-y-arquetipos/", "tipo": "Jung",
     "descripcion": "Lo que te molesta en otros, la sombra dorada, tus arquetipos y la máscara que mostrás."},
    {"titulo": "Laboratorio de estrés y agotamiento", "ruta": "/laboratorio-de-estres/", "tipo": "Estrés",
     "descripcion": "Un semáforo de señales, tu mapa de cargas, micro pausas y un límite en el trabajo."},
    {"titulo": "Laboratorio de descanso y sueño", "ruta": "/laboratorio-de-descanso/", "tipo": "Sueño",
     "descripcion": "Mitos del dormir, hábitos que ayudan, un diario de sueño y pasos para la mente que no para."},
    {"titulo": "Laboratorio de hábitos y pequeños cambios", "ruta": "/laboratorio-de-habitos/", "tipo": "Cambio",
     "descripcion": "Cuánto tarda un hábito, planes «cuando… voy a…», empezar pequeño, tu racha de 30 días y tres cosas buenas."},
    {"titulo": "Laboratorio de respiraciones", "ruta": "/laboratorio-de-respiraciones/", "tipo": "Respiración",
     "descripcion": "Diez técnicas guiadas, de la cuadrada a la alterna por fosas nasales, con su sentido psicológico y sus precauciones."},
    {"titulo": "Laboratorio de meditación", "ruta": "/laboratorio-de-meditacion/", "tipo": "Meditación",
     "descripcion": "Nueve prácticas de Oriente y Occidente: zazen, vipassana, metta, relajación progresiva, un mandala y más."},
    {"titulo": "Laboratorio de pensamientos que se repiten", "ruta": "/laboratorio-de-pensamientos-repetitivos/", "tipo": "Defusión",
     "descripcion": "Diez ejercicios para la rumiación: detectar el bucle, tomar distancia de los pensamientos, del por qué al cómo y salir."},
    {"titulo": "Laboratorio de mindfulness", "ruta": "/laboratorio-de-mindfulness/", "tipo": "Atención plena",
     "descripcion": "Diez prácticas del MBSR y el MBCT para la vida diaria: la pasa, el espacio de respiración, surfear el impulso, RAIN y más."},
    {"titulo": "Laboratorio Gestalt", "ruta": "/laboratorio-gestalt/", "tipo": "Gestalt",
     "descripcion": "Darse cuenta, hablar en primera persona, la silla vacía, asuntos inconclusos y el ciclo de la experiencia."},
    {"titulo": "Laboratorio humanista", "ruta": "/laboratorio-humanista/", "tipo": "Humanista",
     "descripcion": "Yo real y yo ideal, escucha empática, aceptación incondicional y experiencias cumbre, desde Rogers y Maslow."},
    {"titulo": "Laboratorio narrativo", "ruta": "/laboratorio-narrativo/", "tipo": "Narrativa",
     "descripcion": "Externalizar el problema, buscar excepciones, dos historias, el club de la vida y el árbol de la vida."},
    {"titulo": "Laboratorio sistémico", "ruta": "/laboratorio-sistemico/", "tipo": "Sistémica",
     "descripcion": "Tu genograma dibujado en pantalla, preguntas circulares, secuencias que se repiten, mandatos y límites."},
    {"titulo": "Laboratorio de diálogo socrático", "ruta": "/laboratorio-de-dialogo-socratico/", "tipo": "Pensamiento",
     "descripcion": "Reconocer preguntas que abren, los seis tipos de preguntas, un diálogo guiado con tu creencia y cómo preguntar a otros."},
    {"titulo": "Laboratorio de imaginación activa", "ruta": "/laboratorio-de-imaginacion-activa/", "tipo": "Jung",
     "descripcion": "Los pasos de la imaginación activa, un diálogo con una figura interior y un mandala para dibujar con simetría."},
    {"titulo": "Laboratorio de mito personal", "ruta": "/laboratorio-mito-personal/", "tipo": "Jung",
     "descripcion": "Tu viaje del héroe, tu línea de vida en capítulos y la figura de mito o cuento que te acompaña."},
    {"titulo": "Laboratorio de sentido", "ruta": "/laboratorio-de-sentido/", "tipo": "Logoterapia",
     "descripcion": "Las tres vías del sentido de Frankl, preguntas de sentido, la pregunta invertida y una carta desde tu yo futuro."},
    {"titulo": "Laboratorio de escritura expresiva", "ruta": "/laboratorio-de-escritura-expresiva/", "tipo": "Escritura",
     "descripcion": "Cuatro días escribiendo sobre algo difícil, con reloj y contador de palabras, relectura y lo que encontraste."},
    {"titulo": "Laboratorio de ánimo", "ruta": "/laboratorio-de-animo/", "tipo": "Desánimo",
     "descripcion": "El círculo del desánimo, un registro de placer y logro, actividades pequeñas y una agenda amable."},
    {"titulo": "Laboratorio de regulación", "ruta": "/laboratorio-de-regulacion/", "tipo": "Cuerpo y trauma",
     "descripcion": "Tu ventana de tolerancia, anclar en el presente, un mapa del cuerpo, pendulación y un kit de recursos."},
    {"titulo": "Laboratorio de crisis vitales", "ruta": "/laboratorio-de-crisis-vitales/", "tipo": "Transiciones",
     "descripcion": "Las tres fases de una transición, lo que termina y lo que empieza, un ritual de pasaje y el duelo migratorio."},
    {"titulo": "Laboratorio de aceptación y compromiso", "ruta": "/laboratorio-act/", "tipo": "ACT",
     "descripcion": "Tomar distancia de un pensamiento, hojas en el río, soltar la cuerda, la matriz ACT y acciones comprometidas."},
    {"titulo": "Laboratorio de la angustia", "ruta": "/laboratorio-de-la-angustia/", "tipo": "Existencia",
     "descripcion": "Distinguir angustia y miedo, el vértigo de elegir, volver a lo cotidiano y sostenerse, con Kierkegaard, Heidegger y Yalom."},
    {"titulo": "Laboratorio de virtudes", "ruta": "/laboratorio-de-virtudes/", "tipo": "Virtudes",
     "descripcion": "El término medio entre dos extremos, la virtud como hábito, exceso o defecto y una actividad que vale por sí misma, con Aristóteles."},
    {"titulo": "Laboratorio de la vida que no es breve", "ruta": "/laboratorio-de-la-vida-que-no-es-breve/", "tipo": "Sentido",
     "descripcion": "Mirar en qué se va el tiempo, vivir un momento completo, pensar la finitud sin angustia y elegir lo que queremos dejar, con Séneca."},
    {"titulo": "Laboratorio de Séneca", "ruta": "/laboratorio-de-seneca/", "tipo": "Estoicismo",
     "descripcion": "Pausar la ira antes de responder, inventariar el tiempo, escribir una carta a un amigo y consolar, con Séneca."},
    {"titulo": "Laboratorio de Marco Aurelio", "ruta": "/laboratorio-de-marco-aurelio/", "tipo": "Estoicismo",
     "descripcion": "Empezar el día con propósito, ver las cosas como son, recordar lo breve y mirar a otros con benevolencia."},
    {"titulo": "Laboratorio del amor como arte", "ruta": "/laboratorio-del-amor-como-arte/", "tipo": "Amor",
     "descripcion": "Cuidado, responsabilidad, respeto y conocimiento, y la diferencia entre tener y ser, con Erich Fromm."},
    {"titulo": "Laboratorio estoico", "ruta": "/laboratorio-estoico/", "tipo": "Estoicismo",
     "descripcion": "Lo que depende de mí, anticipar un contratiempo, el examen nocturno y la opinión sobre uno mismo, con Epicteto."},
    {"titulo": "Laboratorio de grupos", "ruta": "/laboratorio-de-grupos/", "tipo": "Grupos",
     "descripcion": "La tarea explícita e implícita de un grupo, información, emoción y producción, la universalidad y la esperanza."},
    {"titulo": "Laboratorio de psicología corporal", "ruta": "/laboratorio-de-psicologia-corporal/", "tipo": "Cuerpo",
     "descripcion": "Apoyarte en el suelo, notar dónde guardás la tensión, escuchar una sensación sentida y aflojar, con Reich, Lowen y Gendlin."},
    {"titulo": "Laboratorio de psicología transpersonal", "ruta": "/laboratorio-de-psicologia-transpersonal/", "tipo": "Transpersonal",
     "descripcion": "Dialogar con una subpersonalidad, practicar la desidentificación, ubicar niveles de una experiencia y un momento de asombro."},
    {"titulo": "Laboratorio de pesadillas y noche agitada", "ruta": "/laboratorio-de-pesadillas/", "tipo": "Sueño",
     "descripcion": "Cambiar el final de una pesadilla repetida, volver al cuarto al despertar, escribir la preocupación y volver a dormir."},
    {"titulo": "Laboratorio de pareja", "ruta": "/laboratorio-de-pareja/", "tipo": "Pareja",
     "descripcion": "Una pausa antes de discutir, reparar después de un conflicto, pasar de los celos a un pedido claro y un acuerdo chico."},
    {"titulo": "Laboratorio de adolescentes", "ruta": "/laboratorio-de-adolescentes/", "tipo": "Adolescencia",
     "descripcion": "Dos partes: para adolescentes, sobre cambios, identidad, pantallas y pedir ayuda; y para adultos, sobre escuchar y poner límites."},
    {"titulo": "Laboratorio de psicoanálisis en práctica", "ruta": "/laboratorio-de-psicoanalisis-en-practica/", "tipo": "Psicoanálisis",
     "descripcion": "Asociación libre, un objeto que consuela, recibir y nombrar lo confuso, y sentirse comprendido: Freud, Winnicott, Bion y Kohut."},
    {"titulo": "Laboratorio de relaciones y poder personal", "ruta": "/laboratorio-de-relaciones-y-poder-personal/", "tipo": "Relaciones",
     "descripcion": "Un acto de interés social, yo real y yo ideal, yo bueno y yo malo, y lo que esperás del otro: Adler, Horney y Sullivan."},
    {"titulo": "Laboratorio de aprendizaje y hábito", "ruta": "/laboratorio-de-aprendizaje-y-habito/", "tipo": "Aprendizaje",
     "descripcion": "Registro de antecedente, conducta y consecuencia, señales que disparan emociones, tareas en pasos y el primer paso de un hábito."},
    {"titulo": "Laboratorio del desarrollo y el apego", "ruta": "/laboratorio-del-desarrollo-y-el-apego/", "tipo": "Desarrollo",
     "descripcion": "Ver desde otro lugar, la ayuda justa, la etapa que vivís y una base segura: Piaget, Vygotsky, Erikson, Bowlby y Ainsworth."},
    {"titulo": "Laboratorio de transacciones y estados del yo", "ruta": "/laboratorio-de-transacciones-y-estados-del-yo/", "tipo": "Transacciones",
     "descripcion": "Padre, adulto y niño en una conversación, transacciones paralelas o cruzadas, juegos que se repiten y el contacto en la frontera."},
    {"titulo": "Laboratorio de la psique y la imagen", "ruta": "/laboratorio-de-la-psique-y-la-imagen/", "tipo": "Psique",
     "descripcion": "Una imagen que insiste, desde dónde miro, las preguntas de la segunda mitad de la vida y la trampa de la perfección."},
    {"titulo": "Laboratorio de duda y percepción", "ruta": "/laboratorio-de-duda-y-percepcion/", "tipo": "Filosofía",
     "descripcion": "Descartes, Locke y Husserl en práctica: revisar lo que das por sentado, rastrear el origen de una idea y describir sin explicar."},
    {"titulo": "Laboratorio del cuerpo vivido", "ruta": "/laboratorio-del-cuerpo-vivido/", "tipo": "Filosofía",
     "descripcion": "Merleau-Ponty y Spinoza para sentir el cuerpo: tocar y ser tocado, ubicar la mano sin mirarla, nombrar un afecto y la pausa antes del reflejo."},
    {"titulo": "Laboratorio de la libertad", "ruta": "/laboratorio-de-la-libertad/", "tipo": "Filosofía",
     "descripcion": "Sartre, Heidegger y Kierkegaard: detectar la mala fe, la mirada del otro, estar en el mundo y los estadios de la vida."},
    {"titulo": "Laboratorio de tradiciones orientales", "ruta": "/laboratorio-de-las-tradiciones-orientales/", "tipo": "Oriente",
     "descripcion": "El Buda, Lao Tse, Patañjali y Suzuki: las cuatro verdades en tu día, el wu wei, una sola cosa y un koan."},
    {"titulo": "Laboratorio de razón y autonomía", "ruta": "/laboratorio-de-la-razon-y-la-autonomia/", "tipo": "Filosofía",
     "descripcion": "Kant, Epicteto, Schopenhauer y Nietzsche: separar lo recibido de lo agregado, fines y medios, y de «debo» a «quiero»."},
    {"titulo": "Laboratorio del encuentro", "ruta": "/laboratorio-del-encuentro/", "tipo": "Filosofía",
     "descripcion": "Buber y Hegel para la vida con otros: Yo-Tú o Yo-Ello, el reconocimiento, dos verdades a la vez y escuchar de verdad."},
    {"titulo": "Mi mapa de vínculos", "ruta": "/laboratorio-mi-mapa-de-vinculos/", "tipo": "Vínculos y genograma",
     "descripcion": "Tu mundo vincular en dos capas, la red actual y el genograma: cercanía, intercambios, límites, roles y repeticiones."},
]

TEMAS_LAB = {
    "/laboratorio-de-creatividad/": "Aprendizaje y cambio", "/laboratorio-de-comunicacion-no-violenta/": "Vínculos",
    "/laboratorio-de-habilidades-dbt/": "Emociones", "/laboratorio-de-flexibilidad-yoica/": "Jung y autoconocimiento",
    "/laboratorio-de-emociones/": "Emociones", "/laboratorio-de-presencia/": "Cuerpo y respiración",
    "/laboratorio-de-suenos/": "Jung y autoconocimiento", "/laboratorio-de-valores/": "Jung y autoconocimiento",
    "/laboratorio-de-aprender-a-aprender/": "Aprendizaje y cambio", "/laboratorio-de-ansiedad/": "Emociones", "/laboratorio-de-pensamientos-repetitivos/": "Emociones",
    "/laboratorio-de-autocompasion/": "Emociones", "/laboratorio-de-vinculos/": "Vínculos", "/laboratorio-de-duelo/": "Emociones",
    "/laboratorio-de-sombra-y-arquetipos/": "Jung y autoconocimiento", "/laboratorio-de-estres/": "Cuerpo y respiración",
    "/laboratorio-de-descanso/": "Cuerpo y respiración", "/laboratorio-de-habitos/": "Aprendizaje y cambio",
    "/laboratorio-de-respiraciones/": "Cuerpo y respiración", "/laboratorio-de-meditacion/": "Cuerpo y respiración",
    "/laboratorio-de-mindfulness/": "Cuerpo y respiración",
    "/laboratorio-gestalt/": "Enfoques", "/laboratorio-humanista/": "Enfoques", "/laboratorio-narrativo/": "Enfoques",
    "/laboratorio-sistemico/": "Vínculos", "/laboratorio-de-dialogo-socratico/": "Aprendizaje y cambio",
    "/laboratorio-de-imaginacion-activa/": "Jung y autoconocimiento", "/laboratorio-mito-personal/": "Jung y autoconocimiento",
    "/laboratorio-de-sentido/": "Jung y autoconocimiento", "/laboratorio-de-escritura-expresiva/": "Emociones",
    "/laboratorio-de-animo/": "Emociones", "/laboratorio-de-regulacion/": "Cuerpo y respiración",
    "/laboratorio-de-crisis-vitales/": "Aprendizaje y cambio", "/laboratorio-act/": "Enfoques",
    "/laboratorio-de-duda-y-percepcion/": "Filosofía en práctica", "/laboratorio-del-cuerpo-vivido/": "Filosofía en práctica",
    "/laboratorio-de-la-libertad/": "Filosofía en práctica", "/laboratorio-de-las-tradiciones-orientales/": "Filosofía en práctica",
    "/laboratorio-de-la-razon-y-la-autonomia/": "Filosofía en práctica", "/laboratorio-del-encuentro/": "Filosofía en práctica",
    "/laboratorio-de-psicoanalisis-en-practica/": "Psicología en práctica", "/laboratorio-de-relaciones-y-poder-personal/": "Psicología en práctica",
    "/laboratorio-de-aprendizaje-y-habito/": "Psicología en práctica", "/laboratorio-del-desarrollo-y-el-apego/": "Psicología en práctica",
    "/laboratorio-de-transacciones-y-estados-del-yo/": "Psicología en práctica", "/laboratorio-de-la-psique-y-la-imagen/": "Psicología en práctica",
    "/laboratorio-de-pesadillas/": "Emociones", "/laboratorio-de-pareja/": "Vínculos", "/laboratorio-de-adolescentes/": "Vínculos",
    "/laboratorio-de-psicologia-corporal/": "Cuerpo y respiración", "/laboratorio-de-psicologia-transpersonal/": "Enfoques",
    "/laboratorio-del-amor-como-arte/": "Vínculos", "/laboratorio-estoico/": "Filosofía en práctica", "/laboratorio-de-grupos/": "Vínculos",
    "/laboratorio-de-seneca/": "Filosofía en práctica", "/laboratorio-de-marco-aurelio/": "Filosofía en práctica",
    "/laboratorio-de-la-vida-que-no-es-breve/": "Filosofía en práctica",
    "/laboratorio-de-la-angustia/": "Filosofía en práctica", "/laboratorio-de-virtudes/": "Filosofía en práctica",
    "/laboratorio-mi-mapa-de-vinculos/": "Vínculos",
}
ORDEN_TEMAS = ["Emociones", "Vínculos", "Jung y autoconocimiento", "Cuerpo y respiración", "Enfoques", "Aprendizaje y cambio", "Filosofía en práctica", "Psicología en práctica"]


# Un glifo orgánico por tema del catálogo de laboratorios (24×24, trazo).
_G = '<svg class="lab-glifo" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{}</svg>'
GLIFOS_TEMA = {
    "Emociones": _G.format('<path d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 0 1-12 0C6 10.5 8.5 7.5 12 3z"/>'),
    "Vínculos": _G.format('<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>'),
    "Jung y autoconocimiento": _G.format('<path d="M18.4 7.6A8 8 0 1 0 19.8 13"/><circle cx="12" cy="12" r="1.6"/>'),
    "Cuerpo y respiración": _G.format('<circle cx="12" cy="12" r="2.5"/><path d="M6.5 8.5a6.5 6.5 0 0 0 0 7M17.5 8.5a6.5 6.5 0 0 1 0 7M3.5 6a10 10 0 0 0 0 12M20.5 6a10 10 0 0 1 0 12"/>'),
    "Enfoques": _G.format('<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14z"/><path d="M5 19L13 11"/>'),
    "Psicología en práctica": _G.format('<path d="M12 21c-4-3-7-6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4-3 7-7 10z"/>'),
    "Filosofía en práctica": _G.format('<path d="M4 19V7l8-3 8 3v12"/><path d="M9 19v-6h6v6"/>'),
    "Aprendizaje y cambio": _G.format('<path d="M12 12c0-1 1-2 2-2s2.5 1 2.5 2.5S15 16 12.5 16 8 14 8 11s2.5-5.5 6-5.5 6 3 6 6.5"/>'),
}


def bloque_laboratorios():
    items = "".join(
        f'<a class="lab-catalogo__item" href="{l["ruta"]}" data-tema="{esc(TEMAS_LAB.get(l["ruta"], ""))}">{GLIFOS_TEMA.get(TEMAS_LAB.get(l["ruta"], ""), "")}<span class="recursos-indice__tipo">{esc(l["tipo"])}</span>'
        f'<strong>{esc(l["titulo"])}</strong><span>{esc(l["descripcion"])}</span><span class="lab-catalogo__ir">Entrar al laboratorio →</span></a>'
        for l in LABORATORIOS)
    return f'<div class="lab-catalogo revelar" data-lab-catalogo>{items}</div>'


# Guía «¿Por dónde empiezo?»: tema → página de motivo, artículos y laboratorios sugeridos.
GUIA = [
    ("ansiedad", "Ansiedad o preocupación", "/ansiedad-y-ataques-de-panico/", ["ansiedad-cuando-el-cuerpo-habla", "ansiedad-social", "respiracion-y-emociones"], ["/laboratorio-de-ansiedad/", "/laboratorio-de-pensamientos-repetitivos/", "/laboratorio-de-respiraciones/"]),
    ("panico", "Ataques de pánico", "/ansiedad-y-ataques-de-panico/", ["ataque-de-panico-que-hacer", "respiracion-y-emociones"], ["/laboratorio-de-presencia/"]),
    ("tristeza", "Tristeza o desgano", "/depresion/", ["como-saber-si-necesito-terapia", "la-motivacion"], ["/laboratorio-de-animo/", "/laboratorio-de-pensamientos-repetitivos/", "/laboratorio-de-emociones/", "/laboratorio-de-autocompasion/"]),
    ("vinculos", "Vínculos o pareja", "/dificultades-vinculares/", ["patrones-que-se-repiten-en-los-vinculos", "el-apego", "los-celos"], ["/laboratorio-mi-mapa-de-vinculos/", "/laboratorio-de-vinculos/", "/laboratorio-de-comunicacion-no-violenta/"]),
    ("familia", "Mi familia", "/dificultades-vinculares/", ["terapia-sistemica", "el-genograma", "padres-de-adolescentes"], ["/laboratorio-mi-mapa-de-vinculos/", "/laboratorio-sistemico/"]),
    ("duelo", "Un duelo o una pérdida", "/duelo-y-perdidas/", ["duelo-migratorio", "la-resiliencia"], ["/laboratorio-de-duelo/"]),
    ("estres", "Estrés o agotamiento", "/estres-y-agotamiento/", ["burnout", "la-motivacion", "respiracion-y-emociones"], ["/laboratorio-de-estres/", "/laboratorio-de-mindfulness/", "/laboratorio-de-meditacion/"]),
    ("autoestima", "Autoestima o autocrítica", "/autoestima/", ["autoexigencia-y-perfeccionismo", "la-culpa", "psicologia-humanista-carl-rogers"], ["/laboratorio-de-autocompasion/", "/laboratorio-humanista/"]),
    ("sueno", "Dormir mal", "/estres-y-agotamiento/", ["insomnio", "pesadillas", "respiracion-y-emociones"], ["/laboratorio-de-descanso/", "/laboratorio-de-suenos/"]),
    ("crisis", "Una crisis o un cambio de etapa", "/crisis-vitales/", ["crisis-de-la-mitad-de-la-vida", "logoterapia-y-sentido"], ["/laboratorio-de-crisis-vitales/", "/laboratorio-de-sentido/", "/laboratorio-de-valores/"]),
    ("conocerme", "Conocerme más", "/terapia-junguiana/", ["la-sombra-segun-jung", "que-es-el-eneagrama", "tipos-psicologicos-jung"], ["/laboratorio-de-sombra-y-arquetipos/", "/laboratorio-de-imaginacion-activa/", "/laboratorio-mito-personal/"]),
    ("emociones", "Emociones que me desbordan", "/ansiedad-y-ataques-de-panico/", ["las-emociones-segun-jung", "la-ventana-de-tolerancia"], ["/laboratorio-de-regulacion/", "/laboratorio-de-habilidades-dbt/", "/laboratorio-de-emociones/"]),
    ("cambio", "Cambiar hábitos o empezar algo", "/crisis-vitales/", ["procrastinacion", "metahabilidades", "la-motivacion"], ["/laboratorio-de-habitos/", "/laboratorio-de-creatividad/"]),
    ("meditar", "Empezar a meditar o respirar mejor", "/terapia-junguiana/", ["que-es-la-meditacion", "cuando-meditar-no-es-recomendable"], ["/laboratorio-de-mindfulness/", "/laboratorio-de-meditacion/", "/laboratorio-de-respiraciones/"]),
]


NOMBRES_MOTIVO = {"/ansiedad-y-ataques-de-panico/": "Ansiedad y ataques de pánico", "/depresion/": "Depresión",
                  "/dificultades-vinculares/": "Dificultades vinculares", "/duelo-y-perdidas/": "Duelo y pérdidas",
                  "/estres-y-agotamiento/": "Estrés y agotamiento", "/autoestima/": "Autoestima", "/crisis-vitales/": "Crisis vitales",
                  "/terapia-junguiana/": "Terapia junguiana"}


GUIA_TESTS = {
    "ansiedad": [("Escala de ansiedad GAD-7", "/escala-de-ansiedad-gad-7/")],
    "panico": [("Escala de ansiedad GAD-7", "/escala-de-ansiedad-gad-7/")],
    "tristeza": [("Cuestionario de ánimo PHQ-9", "/escala-de-animo-phq-9/")],
    "vinculos": [("Test de estilos de apego", "/test-de-estilos-de-apego/")],
    "estres": [("Test de afrontamiento del estrés", "/test-de-afrontamiento-del-estres/")],
    "autoestima": [("Escala de autoestima de Rosenberg", "/escala-de-autoestima-rosenberg/")],
    "conocerme": [("El mapa de lo que me habita", "/el-mapa-de-lo-que-me-habita/"), ("Test de eneagrama", "/test-de-eneagrama/"), ("Test de mecanismos de defensa", "/test-de-mecanismos-de-defensa/"), ("Si no fueras una persona, ¿qué serías?", "/ejercicio-desiderativo/")],
    "emociones": [("Test de mecanismos de defensa", "/test-de-mecanismos-de-defensa/")],
    "crisis": [("Una persona bajo la lluvia", "/ejercicio-persona-bajo-la-lluvia/")],
}


def bloque_guia():
    arts = {a["archivo"][:-3]: a for a in ARTICULOS if a["publicado"]}
    labs = {l["ruta"]: l["titulo"] for l in LABORATORIOS}
    datos = {}
    for clave, nombre, motivo, slugs_a, rutas_l in GUIA:
        datos[clave] = {"n": nombre, "m": motivo, "mn": NOMBRES_MOTIVO.get(motivo, motivo),
                        "a": [[arts[x]["titulo"], arts[x]["ruta"]] for x in slugs_a if x in arts],
                        "l": [[labs[r], r] for r in rutas_l if r in labs],
                        "t": [list(x) for x in GUIA_TESTS.get(clave, [])]}
    chips = "".join(f'<label class="opcion"><input type="checkbox" name="guia" value="{c}"><span>{esc(n)}</span></label>' for c, n, *_ in GUIA)
    jd = json.dumps(datos, ensure_ascii=False).replace("</", "<\\/")
    return (f'<fieldset class="lab-tarjeta guia" data-guia><legend class="lab-paso__titulo">¿Qué te está pasando? <span class="lab-paso__ayuda">Podés elegir varias.</span></legend>'
            f'<div class="opciones">{chips}</div></fieldset>'
            f'<div class="guia-resultado" data-guia-resultado aria-live="polite"></div>'
            f'<script type="application/json" id="guia-datos">{jd}</script>')


def bloque_filtros_laboratorios():
    botones = '<button type="button" class="lab-filtro" aria-pressed="true" data-filtro="">Todos</button>' + "".join(
        f'<button type="button" class="lab-filtro" aria-pressed="false" data-filtro="{esc(t)}">{esc(t)}</button>' for t in ORDEN_TEMAS)
    return (f'<div class="lab-filtros" role="group" aria-label="Filtrar laboratorios por tema" data-lab-filtros hidden>{botones}</div>'
            f'<p class="lab-filtros__estado" role="status" data-lab-filtros-estado></p>')


def cabecera(ruta):
    items = []
    for i, (txt, href, sub) in enumerate(NAV):
        if sub:
            actual = any(ruta == s[1] for s in sub) or (txt == "Recursos" and ruta.startswith("/recursos/"))
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
            actual = any(ruta == h for _, h, _ in sub) or (txt == "Recursos" and ruta.startswith("/recursos/"))
            enlaces = "".join(f'<li><a href="{h}"{" aria-current=\"page\"" if ruta == h else ""}>{esc(t)}<small>{esc(d)}</small></a></li>' for t, h, d in sub)
            movil.append(f'<li class="menu-movil__grupo"><details{" open" if actual else ""}><summary>{esc(txt)}<span class="menu-movil__signo" aria-hidden="true"></span></summary><ul>{enlaces}</ul></details></li>')
        else:
            cur = ' aria-current="page"' if ruta == href or (href != "/" and ruta.startswith(href)) else ""
            movil.append(f'<li><a href="{href}"{cur}>{esc("Motivos de consulta" if txt == "Motivos" else txt)}</a></li>')
    movil.append(f'<li><a href="/contacto/"{" aria-current=\"page\"" if ruta == "/contacto/" else ""}>Contacto</a></li>')
    return f'''<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera">
  <div class="contenedor cabecera__fila">
    <a class="marca" href="/">
      {SIMBOLO}
      <span class="marca__texto"><span class="marca__nombre">Nicolás Bongiorno</span><span class="marca__rol">Psicólogo clínico · {esc(C["matricula"])}</span></span>
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav__lista">{"".join(items)}</ul>
      <a class="tema-boton buscar-boton" href="/buscar/" aria-label="Buscar en el sitio" title="Buscar (atajo: /)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></a>
      <button class="tema-boton" type="button" aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro"><svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg><svg class="sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg></button>
      <a class="boton boton--chico cabecera__cta" href="/contacto/">Pedir una entrevista</a>
    </nav>
    <div class="cabecera__movil"><a class="tema-boton tema-boton--movil buscar-boton" href="/buscar/" aria-label="Buscar en el sitio" title="Buscar (atajo: /)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></a><button class="tema-boton tema-boton--movil" type="button" aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro"><svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg><svg class="sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg></button><button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu-movil"><span class="menu-boton__texto">Menú</span><span class="menu-boton__lineas" aria-hidden="true"></span></button></div>
  </div>
</header>
<div class="menu-movil" id="menu-movil">
  <nav aria-label="Principal (móvil)"><ul>{"".join(movil)}</ul></nav>
  <div class="menu-movil__pie">
    <a class="boton" href="/contacto/">Pedir una primera entrevista</a>
    <a class="boton boton--secundario boton--whatsapp" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="menu">{ICON["whatsapp"]} Escribirme por WhatsApp</a>
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
          <li><a href="/psicoterapia-para-adultos/">Adultos</a></li>
          <li><a href="/psicologo-para-adolescentes/">Adolescentes</a></li>
          <li><a href="/terapia-para-adultos-mayores/">Adultos mayores</a></li>
          <li><a href="/contacto/">Pedir una primera entrevista</a></li>
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
    <h3 class="resenas__titulo">Más opiniones, <em>tal como fueron escritas</em></h3>
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
        figs = "".join(f'''<figure class="opinion revelar"><span class="opinion__comillas">{ICON["comillas"]}</span><blockquote><p>{esc(c["texto"])}</p></blockquote>
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
            "inLanguage": C["idioma"],
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
        ("Pago desde el exterior", "Remitly, Western Union, Global66 u otras plataformas de pago internacional"),
        ("Opiniones", "Más de 100 reseñas en Google y 80 en Doctoralia"),
        ("Contacto", f'WhatsApp {C["whatsapp_visible"]}'),
    ]
    dl = "".join(f"<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>" for k, v in filas)
    return f'<aside class="datos-clave" aria-labelledby="titulo-datos-clave"><h2 id="titulo-datos-clave">Datos clave</h2><dl>{dl}</dl></aside>'


WIKI = {
    "viktor-frankl": ("Viktor Frankl", "https://es.wikipedia.org/wiki/Viktor_Frankl"),
    "peter-levine": ("Peter A. Levine", "https://en.wikipedia.org/wiki/Peter_A._Levine"),
    "daniel-siegel": ("Daniel J. Siegel", "https://en.wikipedia.org/wiki/Daniel_J._Siegel"),
    "steven-hayes": ("Steven C. Hayes", "https://en.wikipedia.org/wiki/Steven_C._Hayes"),
    "socrates": ("Sócrates", "https://es.wikipedia.org/wiki/S%C3%B3crates"),
    "metodo-socratico": ("Método socrático", "https://es.wikipedia.org/wiki/M%C3%A9todo_socr%C3%A1tico"),
    "mayeutica": ("Mayéutica", "https://es.wikipedia.org/wiki/May%C3%A9utica"),
    "aaron-beck": ("Aaron T. Beck", "https://es.wikipedia.org/wiki/Aaron_T._Beck"),
    "jung": ("Carl Gustav Jung", "https://es.wikipedia.org/wiki/Carl_Gustav_Jung"),
    "freud": ("Sigmund Freud", "https://es.wikipedia.org/wiki/Sigmund_Freud"),
    "ferenczi": ("Sándor Ferenczi", "https://es.wikipedia.org/wiki/S%C3%A1ndor_Ferenczi"),
    "anna-freud": ("Anna Freud", "https://es.wikipedia.org/wiki/Anna_Freud"),
    "melanie-klein": ("Melanie Klein", "https://es.wikipedia.org/wiki/Melanie_Klein"),
    "winnicott": ("Donald Winnicott", "https://es.wikipedia.org/wiki/Donald_Winnicott"),
    "bion": ("Wilfred Bion", "https://es.wikipedia.org/wiki/Wilfred_Bion"),
    "lacan": ("Jacques Lacan", "https://es.wikipedia.org/wiki/Jacques_Lacan"),
    "kohut": ("Heinz Kohut", "https://es.wikipedia.org/wiki/Heinz_Kohut"),
    "pichon-riviere": ("Enrique Pichon-Rivière", "https://es.wikipedia.org/wiki/Enrique_Pichon-Rivi%C3%A8re"),
    "aberastury": ("Arminda Aberastury", "https://es.wikipedia.org/wiki/Arminda_Aberastury"),
    "psicoanalisis": ("Psicoanálisis", "https://es.wikipedia.org/wiki/Psicoan%C3%A1lisis"),
    "von-franz": ("Marie-Louise von Franz", "https://es.wikipedia.org/wiki/Marie-Louise_von_Franz"),
    "neumann": ("Erich Neumann", "https://en.wikipedia.org/wiki/Erich_Neumann_(psychologist)"),
    "fordham": ("Michael Fordham", "https://en.wikipedia.org/wiki/Michael_Fordham"),
    "edinger": ("Edward Edinger", "https://en.wikipedia.org/wiki/Edward_Edinger"),
    "hillman": ("James Hillman", "https://es.wikipedia.org/wiki/James_Hillman"),
    "woodman": ("Marion Woodman", "https://en.wikipedia.org/wiki/Marion_Woodman"),
    "bolen": ("Jean Shinoda Bolen", "https://en.wikipedia.org/wiki/Jean_Shinoda_Bolen"),
    "estes": ("Clarissa Pinkola Estés", "https://en.wikipedia.org/wiki/Clarissa_Pinkola_Est%C3%A9s"),
    "hollis": ("James Hollis", "https://en.wikipedia.org/wiki/James_Hollis"),
    "rogers": ("Carl Rogers", "https://es.wikipedia.org/wiki/Carl_Rogers"),
    "maslow": ("Abraham Maslow", "https://es.wikipedia.org/wiki/Abraham_Maslow"),
    "fromm": ("Erich Fromm", "https://es.wikipedia.org/wiki/Erich_Fromm"),
    "rollo-may": ("Rollo May", "https://es.wikipedia.org/wiki/Rollo_May"),
    "yalom": ("Irvin D. Yalom", "https://en.wikipedia.org/wiki/Irvin_D._Yalom"),
    "fritz-perls": ("Fritz Perls", "https://es.wikipedia.org/wiki/Fritz_Perls"),
    "laura-perls": ("Laura Perls", "https://en.wikipedia.org/wiki/Laura_Perls"),
    "naranjo": ("Claudio Naranjo", "https://es.wikipedia.org/wiki/Claudio_Naranjo"),
    "berne": ("Eric Berne", "https://es.wikipedia.org/wiki/Eric_Berne"),
    "pavlov": ("Iván Pávlov", "https://es.wikipedia.org/wiki/Iv%C3%A1n_P%C3%A1vlov"),
    "watson": ("John B. Watson", "https://es.wikipedia.org/wiki/John_B._Watson"),
    "skinner": ("B. F. Skinner", "https://es.wikipedia.org/wiki/B._F._Skinner"),
    "bandura": ("Albert Bandura", "https://es.wikipedia.org/wiki/Albert_Bandura"),
    "ellis": ("Albert Ellis", "https://es.wikipedia.org/wiki/Albert_Ellis"),
    "seligman": ("Martin Seligman", "https://es.wikipedia.org/wiki/Martin_Seligman"),
    "linehan": ("Marsha M. Linehan", "https://en.wikipedia.org/wiki/Marsha_M._Linehan"),
    "kabat-zinn": ("Jon Kabat-Zinn", "https://en.wikipedia.org/wiki/Jon_Kabat-Zinn"),
    "bateson": ("Gregory Bateson", "https://es.wikipedia.org/wiki/Gregory_Bateson"),
    "watzlawick": ("Paul Watzlawick", "https://es.wikipedia.org/wiki/Paul_Watzlawick"),
    "satir": ("Virginia Satir", "https://es.wikipedia.org/wiki/Virginia_Satir"),
    "minuchin": ("Salvador Minuchin", "https://es.wikipedia.org/wiki/Salvador_Minuchin"),
    "bowen": ("Murray Bowen", "https://en.wikipedia.org/wiki/Murray_Bowen"),
    "piaget": ("Jean Piaget", "https://es.wikipedia.org/wiki/Jean_Piaget"),
    "vygotsky": ("Lev Vygotski", "https://es.wikipedia.org/wiki/Lev_Vygotski"),
    "ainsworth": ("Mary Ainsworth", "https://es.wikipedia.org/wiki/Mary_Ainsworth"),
    "erikson": ("Erik Erikson", "https://es.wikipedia.org/wiki/Erik_Erikson"),
    "wundt": ("Wilhelm Wundt", "https://es.wikipedia.org/wiki/Wilhelm_Wundt"),
    "platon": ("Platón", "https://es.wikipedia.org/wiki/Plat%C3%B3n"),
    "aristoteles": ("Aristóteles", "https://es.wikipedia.org/wiki/Arist%C3%B3teles"),
    "epicteto": ("Epicteto", "https://es.wikipedia.org/wiki/Epicteto"),
    "spinoza": ("Baruch Spinoza", "https://es.wikipedia.org/wiki/Baruch_Spinoza"),
    "kant": ("Immanuel Kant", "https://es.wikipedia.org/wiki/Immanuel_Kant"),
    "hegel": ("Georg Wilhelm Friedrich Hegel", "https://es.wikipedia.org/wiki/Georg_Wilhelm_Friedrich_Hegel"),
    "schopenhauer": ("Arthur Schopenhauer", "https://es.wikipedia.org/wiki/Arthur_Schopenhauer"),
    "kierkegaard": ("Søren Kierkegaard", "https://es.wikipedia.org/wiki/S%C3%B8ren_Kierkegaard"),
    "nietzsche": ("Friedrich Nietzsche", "https://es.wikipedia.org/wiki/Friedrich_Nietzsche"),
    "buber": ("Martin Buber", "https://es.wikipedia.org/wiki/Martin_Buber"),
    "seneca": ("Séneca", "https://es.wikipedia.org/wiki/S%C3%A9neca"),
    "marco-aurelio": ("Marco Aurelio", "https://es.wikipedia.org/wiki/Marco_Aurelio"),
    "lowen": ("Alexander Lowen", "https://es.wikipedia.org/wiki/Alexander_Lowen"),
    "gendlin": ("Eugene Gendlin", "https://es.wikipedia.org/wiki/Eugene_Gendlin"),
    "grof": ("Stanislav Grof", "https://es.wikipedia.org/wiki/Stanislav_Grof"),
    "wilber": ("Ken Wilber", "https://es.wikipedia.org/wiki/Ken_Wilber"),
    "assagioli": ("Roberto Assagioli", "https://es.wikipedia.org/wiki/Roberto_Assagioli"),
    "descartes": ("René Descartes", "https://es.wikipedia.org/wiki/Ren%C3%A9_Descartes"),
    "locke": ("John Locke", "https://es.wikipedia.org/wiki/John_Locke"),
    "husserl": ("Edmund Husserl", "https://es.wikipedia.org/wiki/Edmund_Husserl"),
    "heidegger": ("Martin Heidegger", "https://es.wikipedia.org/wiki/Martin_Heidegger"),
    "sartre": ("Jean-Paul Sartre", "https://es.wikipedia.org/wiki/Jean-Paul_Sartre"),
    "merleau-ponty": ("Maurice Merleau-Ponty", "https://es.wikipedia.org/wiki/Maurice_Merleau-Ponty"),
    "buda": ("Buda Gautama", "https://es.wikipedia.org/wiki/Buda_Gautama"),
    "lao-tse": ("Lao-Tse", "https://es.wikipedia.org/wiki/Lao-Tse"),
    "patanjali": ("Patañjali", "https://es.wikipedia.org/wiki/Pata%C3%B1jali"),
    "suzuki": ("D. T. Suzuki", "https://es.wikipedia.org/wiki/Daisetsu_Teitaro_Suzuki"),
    "william-james": ("William James", "https://es.wikipedia.org/wiki/William_James"),
    "adler": ("Alfred Adler", "https://es.wikipedia.org/wiki/Alfred_Adler"),
    "rank": ("Otto Rank", "https://es.wikipedia.org/wiki/Otto_Rank"),
    "reich": ("Wilhelm Reich", "https://es.wikipedia.org/wiki/Wilhelm_Reich"),
    "horney": ("Karen Horney", "https://es.wikipedia.org/wiki/Karen_Horney"),
    "sullivan": ("Harry Stack Sullivan", "https://es.wikipedia.org/wiki/Harry_Stack_Sullivan"),
    "binswanger": ("Ludwig Binswanger", "https://es.wikipedia.org/wiki/Ludwig_Binswanger"),
    "laing": ("Ronald D. Laing", "https://es.wikipedia.org/wiki/Ronald_David_Laing"),
    "langer": ("Marie Langer", "https://es.wikipedia.org/wiki/Marie_Langer"),
    "bowlby": ("John Bowlby", "https://es.wikipedia.org/wiki/John_Bowlby"),
    "psicologia-analitica": ("Psicología analítica", "https://es.wikipedia.org/wiki/Psicolog%C3%ADa_anal%C3%ADtica"),
    "ansiedad": ("Ansiedad", "https://es.wikipedia.org/wiki/Ansiedad"),
    "duelo": ("Duelo", "https://es.wikipedia.org/wiki/Duelo_(sentimiento)"),
    "depresion": ("Depresión", "https://es.wikipedia.org/wiki/Depresi%C3%B3n"),
    "personalidad": ("Personalidad", "https://es.wikipedia.org/wiki/Personalidad"),
    "inteligencia": ("Inteligencia", "https://es.wikipedia.org/wiki/Inteligencia"),
    "inteligencia-emocional": ("Inteligencia emocional", "https://es.wikipedia.org/wiki/Inteligencia_emocional"),
    "inteligencias-multiples": ("Teoría de las inteligencias múltiples", "https://es.wikipedia.org/wiki/Teor%C3%ADa_de_las_inteligencias_m%C3%BAltiples"),
    "apego": ("Teoría del apego", "https://es.wikipedia.org/wiki/Teor%C3%ADa_del_apego"),
    "mecanismos-de-defensa": ("Mecanismo de defensa", "https://es.wikipedia.org/wiki/Mecanismo_de_defensa"),
    "memoria": ("Memoria", "https://es.wikipedia.org/wiki/Memoria_(proceso)"),
    "motivacion": ("Motivación", "https://es.wikipedia.org/wiki/Motivaci%C3%B3n"),
    "resiliencia": ("Resiliencia", "https://es.wikipedia.org/wiki/Resiliencia_(psicolog%C3%ADa)"),
    "empatia": ("Empatía", "https://es.wikipedia.org/wiki/Empat%C3%ADa"),
    "metacognicion": ("Metacognición", "https://es.wikipedia.org/wiki/Metacognici%C3%B3n"),
    "creatividad": ("Creatividad", "https://es.wikipedia.org/wiki/Creatividad"),
    "meditacion": ("Meditación", "https://es.wikipedia.org/wiki/Meditaci%C3%B3n"),
    "mindfulness": ("Mindfulness", "https://es.wikipedia.org/wiki/Mindfulness"),
    "zen": ("Zen", "https://es.wikipedia.org/wiki/Zen"),
    "vipassana": ("Vipassana", "https://es.wikipedia.org/wiki/Vipassana"),
    "meditacion-trascendental": ("Meditación trascendental", "https://es.wikipedia.org/wiki/Meditaci%C3%B3n_trascendental"),
    "pranayama": ("Pranayama", "https://es.wikipedia.org/wiki/Pranayama"),
    "gestalt": ("Terapia Gestalt", "https://es.wikipedia.org/wiki/Terapia_Gestalt"),
    "humanista": ("Psicología humanista", "https://es.wikipedia.org/wiki/Psicolog%C3%ADa_humanista"),
    "narrativa": ("Terapia narrativa", "https://es.wikipedia.org/wiki/Terapia_narrativa"),
    "sistemica": ("Terapia familiar", "https://es.wikipedia.org/wiki/Terapia_familiar"),
    "genograma": ("Genograma", "https://es.wikipedia.org/wiki/Genograma"),
    "eneagrama": ("Eneagrama de la personalidad", "https://es.wikipedia.org/wiki/Eneagrama_de_la_personalidad"),
}

CATEGORIAS = {
    "Jung y psicología analítica": "Sueños, sombra, arquetipos e individuación: la psicología analítica de Carl Gustav Jung, explicada para la vida cotidiana.",
    "Ansiedad y emociones": "Ansiedad, ataques de pánico y emociones difíciles: qué nos dicen, por qué aparecen y cómo atravesarlas con ayuda.",
    "Vínculos y relaciones": "Patrones que se repiten, dependencia emocional y la forma en que nos vinculamos con la pareja, la familia y los otros.",
    "Salud mental": "Cuándo consultar a un psicólogo, cómo acompañar a alguien que sufre y cómo cuidar la propia salud mental.",
    "Psicología contemporánea": "Psicoterapia integrativa, terapia online, duelo migratorio y otros temas de la psicología de hoy, en lenguaje claro.",
    "Psicología básica": "Personalidad, inteligencia, emociones, apego, memoria y motivación: los conceptos básicos de la psicología, explicados en lenguaje claro.",
    "Meditación y respiración": "Tipos de meditación de Oriente y Occidente, técnicas de respiración y lo que dice la psicología sobre ellas: beneficios, límites y cuidados.",
    "Evaluación psicológica": "Apto psicológico para la licencia de conducir, técnicas proyectivas como el HTP y el desiderativo, y técnicas psicométricas: qué son y cómo se usan.",
    "Eneagrama": "El eneagrama de la personalidad y sus nueve eneatipos: motivaciones, miedos, alas y caminos de crecimiento, desde una mirada psicológica y crítica.",
    "Historia de la psicología": "Quiénes hicieron la psicología: la vida, las ideas y los conceptos fundamentales de sus autores, del psicoanálisis al presente.",
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


def bloque_asistente(nivel=2):
    # (texto visible, frase para el mensaje). Se pueden elegir varios: casi nadie consulta por un solo tema.
    motivos = [("Ansiedad o ataques de pánico", "ansiedad o ataques de pánico"), ("Estrés o agotamiento", "estrés o agotamiento"),
               ("Tristeza o desgano", "tristeza o desgano"), ("Un duelo o una pérdida", "un duelo o una pérdida"),
               ("Mis vínculos o mi pareja", "cosas de mis vínculos o de mi pareja"), ("Mi familia", "temas familiares"),
               ("Autoestima o inseguridad", "autoestima o inseguridad"), ("Algo que se repite en mi vida", "algo que se repite en mi vida"),
               ("Una crisis o un cambio de etapa", "una crisis o un cambio de etapa"), ("Conocerme más", "conocerme más"),
               ("Todavía no lo sé", "")]
    opciones_motivo = "".join(f'<label class="opcion"><input type="checkbox" name="motivo" value="{esc(v)}" data-frase="{esc(f)}"><span>{esc(v)}</span></label>' for v, f in motivos)
    def opciones(nombre, lista):
        return "".join(f'<label class="opcion"><input type="radio" name="{nombre}" value="{esc(v)}"><span>{esc(v)}</span></label>' for v in lista)
    return f'''<section class="asistente revelar" id="empezar" aria-labelledby="titulo-asistente">
  <p class="antetitulo">Empezar en 3 pasos</p>
  <h{nivel} id="titulo-asistente">No hace falta saber <em>qué escribir</em></h{nivel}>
  <p class="asistente__intro">Respondé tres preguntas y te armo el mensaje para que lo envíes por WhatsApp. No es un test ni un diagnóstico, y no se guarda ningún dato.</p>
  <form class="asistente__form" id="asistente" novalidate>
    <fieldset class="asistente__paso" data-paso="1"><legend><span>1</span> ¿Qué te trae?</legend><p class="asistente__subpaso asistente__subpaso--ayuda">Podés marcar varias: casi nunca es una sola cosa.</p><div class="opciones">{opciones_motivo}</div></fieldset>
    <fieldset class="asistente__paso" data-paso="2"><legend><span>2</span> ¿Cómo preferís?</legend><div class="opciones">{opciones("modalidad", ["Presencial en Alta Gracia", "Online", "Me da igual"])}</div></fieldset>
    <fieldset class="asistente__paso" data-paso="3"><legend><span>3</span> ¿Qué horario te queda mejor?</legend><p class="asistente__nota" data-asistente-nota hidden></p><div class="opciones">{opciones("horario", ["Mañana", "Tarde", "Noche", "Cualquiera"])}</div><p class="asistente__subpaso" id="asistente-dias">¿Qué días? <span>(podés elegir varios)</span></p><div class="opciones" role="group" aria-labelledby="asistente-dias">{"".join(f'<label class="opcion"><input type="checkbox" name="dias" value="{d}"><span>{d}</span></label>' for d in ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"])}</div></fieldset>
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
    <a class="boton boton--claro" href="/contacto/">Pedir una primera entrevista {ICON["flecha"]}</a>
    <a class="boton boton--secundario boton--whatsapp" href="{wa()}" target="_blank" rel="noopener" data-ubicacion="{ubicacion}">{ICON["whatsapp"]} Escribirme por WhatsApp</a>
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
            ("Psicoterapia para adultos", "/psicoterapia-para-adultos/"),
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
            ("Apto psicológico para la licencia de conducir", "/recursos/apto-psicologico-licencia-de-conducir/"),
        ]],
        "paymentAccepted": "Atención particular, con factura para reintegro de obra social o prepaga. Desde el exterior: Remitly, Western Union, Global66 u otras plataformas de pago internacional",
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
    script = ["'self'", f"'sha256-{JS_INLINE_HASH}'", "'inline-speculation-rules'"]
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
{"" if meta.get("articulo") else f'<meta name="author" content="{esc(NOMBRE_COMPLETO)}">'}
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
<link rel="preload" href="/assets/fonts/playfair-display-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/montserrat-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/estilos.css?v={VERSION}">{f'<link rel="stylesheet" href="/assets/css/interactivo.css?v={VERSION}">' if meta.get("scripts") else ""}{f'<link rel="stylesheet" href="/assets/css/figuras.css?v={VERSION}">' if meta.get("figuras") else ""}
<script>{JS_INLINE}</script>
<script type="application/ld+json">
{jsonld}
</script>
<script type="speculationrules">{REGLAS_ESPECULACION}</script>
<script type="application/json" id="config-sitio">{config_js}</script>
<script src="/assets/js/sitio.js?v={VERSION}" defer></script>
{"".join(f'<script src="/assets/js/{x}?v={VERSION}" defer></script>' for x in meta.get("scripts", []))}
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
<a class="volver-arriba" href="#contenido" aria-label="Volver arriba"><svg class="volver-arriba__anillo" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" pathLength="1"/></svg>{ICON["arriba"]}</a>
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
        palabras = len(re.findall(r"\w+", re.sub(r"^## Para seguir leyendo.*", "", cuerpo, flags=re.S | re.M)))
        meta["lectura"] = str(max(3, round(palabras / 200)))
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
    caja_mapa = bloque_mapa(a["archivo"][:-3])
    if caja_mapa:
        i_corte = cuerpo_md.find('<h2 id="para-seguir-leyendo">')
        cuerpo_md = cuerpo_md + caja_mapa if i_corte < 0 else cuerpo_md[:i_corte] + caja_mapa + cuerpo_md[i_corte:]
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
    <p class="articulo__meta"><span>Lectura de {esc(a.get("lectura", "6"))} minutos</span><span>Publicado en <time datetime="{a.get("revision", a.get("fecha", HOY))}">{esc(a.get("fecha_visible", a.get("fecha", HOY)))}</time></span></p>
  </div>
</section>
<div class="contenedor--texto prosa prosa--articulo" style="padding-bottom:var(--sec)">
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
        "figuras": "figura-articulo" in cuerpo_md,
        "articulo": {"fecha": a.get("fecha", HOY)},
        "schema_extra": [{
            "@type": "Article", "@id": f'{URL}{a["ruta"]}#articulo', "headline": a["titulo"], "description": a["descripcion"],
            "inLanguage": C["idioma"], "datePublished": a.get("fecha", HOY), "dateModified": a.get("fecha", HOY),
            "publisher": {"@id": f"{URL}/#nicolas-bongiorno"},
            "mainEntityOfPage": f'{URL}{a["ruta"]}', "articleSection": a["categoria"],
            "image": f"{URL}/assets/img/{og}", "keywords": a.get("palabras_clave", ""),
            **({"mentions": menciones, "about": menciones[0]} if menciones else {}),
            "isPartOf": {"@id": f'{URL}{ruta_categoria(a["categoria"])}#pagina'},
        }],
    }
    return meta, cuerpo


# --------------------------------------------------------------------------- render de páginas
def reemplazos(cuerpo, ruta):
    parciales = {
        "motivos": lambda: bloque_motivos(),
        "motivos_6": lambda: bloque_motivos(6),
        "faq": lambda: bloque_faq(),
        "faq_inicio": lambda: bloque_faq(["necesito-terapia", "primera-sesion", "obra-social", "terapia-online", "otro-pais", "como-solicitar"]),
        "faq_online": lambda: bloque_faq(["terapia-online", "otro-pais", "pago-exterior", "online-vs-presencial"]),
        "faq_jung": lambda: bloque_faq(["que-es-terapia-junguiana", "suenos", "psicoanalisis-diferencia", "terapia-online"]),
        "faq_primera": lambda: bloque_faq(["nunca-hice-terapia", "primera-sesion", "obra-social", "como-solicitar", "confidencialidad"]),
        "faq_alta_gracia": lambda: bloque_faq(["primera-sesion", "duracion", "obra-social", "adolescentes", "como-solicitar"]),
        "faq_adultos": lambda: bloque_faq(["necesito-terapia", "nunca-hice-terapia", "primera-sesion", "online-vs-presencial", "confidencialidad"]),
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
        "mapa_autores": mapa_autores_svg,
        "indice_autores": indice_autores_html,
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
        "asistente_h3": lambda: bloque_asistente(3),
        "laboratorios": bloque_laboratorios,
        "filtros_laboratorios": bloque_filtros_laboratorios,
        "guia": bloque_guia,
        "zona_horaria": lambda: ('<aside class="zona-horaria" data-zona hidden aria-label="Tu zona horaria">'
            f'<span class="zona-horaria__icono">{ICON["globo"]}</span><p>Parece que estás en <strong data-zona-lugar></strong>. '
            'Allá son las <strong data-zona-local></strong> y en Argentina, las <strong data-zona-ar></strong> '
            '(<span data-zona-dif></span>). Cuando me escribas, coordinamos el turno teniendo en cuenta tu horario.</p></aside>'),
        "conversor": lambda: ('<div class="conversor" data-conversor hidden><p class="conversor__titulo">Conversor de horarios</p>'
            '<label for="conversor-hora">Si te propongo un turno a las</label><select id="conversor-hora">'
            + "".join(f'<option value="{h}"{" selected" if h == 18 else ""}>{h:02d}:00 h</option>' for h in range(8, 22))
            + '</select><span> de Argentina, en <strong data-conversor-lugar></strong> sería:</span>'
            '<p class="conversor__resultado" data-conversor-resultado aria-live="polite"></p></div>'),
        "disponibilidad": lambda: ('<p class="disponibilidad entra"><span class="disponibilidad__punto" aria-hidden="true"></span>Recibiendo nuevas consultas · presencial y online</p>' if C.get("recibiendo_consultas") else ""),
        "glosario": bloque_glosario,
        "datos_clave": bloque_datos_clave,
        "avatar": lambda: (f'<img class="hero__avatar" src="/assets/img/nicolas-bongiorno-112.webp" alt="" width="56" height="70" decoding="async">' if C.get("foto_chica") else ""),
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


VERSION = hashlib.md5((RAIZ / "assets/css/estilos.css").read_bytes() + (RAIZ / "assets/css/interactivo.css").read_bytes() + (RAIZ / "assets/css/figuras.css").read_bytes() + (RAIZ / "assets/css/oscuro.plantilla.css").read_bytes() + b"".join(f.read_bytes() for f in sorted((RAIZ / "assets/js").glob("*.js"))) + (RAIZ / "contenido/psicoquiz.json").read_bytes()).hexdigest()[:8]


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
    inter_pub = SALIDA / "assets/css/interactivo.css"
    inter_pub.write_text(minificar_css(inter_pub.read_text(encoding="utf-8")), encoding="utf-8")
    fig_pub = SALIDA / "assets/css/figuras.css"
    fig_pub.write_text(minificar_css(fig_pub.read_text(encoding="utf-8")), encoding="utf-8")
    (SALIDA / "assets/css/oscuro.plantilla.css").unlink()
    # PsicoQuiz: el banco de preguntas vive en contenido/psicoquiz.json y se publica como script versionado.
    banco = json.loads((RAIZ / "contenido/psicoquiz.json").read_text(encoding="utf-8"))
    (SALIDA / "assets/js/psicoquiz-banco.js").write_text(
        "window.PSICOQUIZ=" + json.dumps(banco, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";\n", encoding="utf-8")
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
{('<div class="descarga descarga--lab revelar" style="margin-bottom:2rem"><p><strong>El mapa de la psicología.</strong>Los autores de la serie ubicados por escuela y por época, con sus influencias, formaciones, rupturas y diálogos.</p><a class="boton boton--chico" href="' + MAPA_RUTA + '">Ver el mapa</a></div>') if cat == "Historia de la psicología" and MAPA else ""}
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
        ("Para quién", ["/psicoterapia-para-adultos/", "/psicologo-para-adolescentes/", "/terapia-para-adultos-mayores/"]),
        ("Motivos de consulta", ["/motivos-de-consulta/"] + [r for r, _, _ in mapa if r in (
            "/ansiedad-y-ataques-de-panico/", "/depresion/", "/estres-y-agotamiento/", "/duelo-y-perdidas/", "/crisis-vitales/",
            "/autoestima/", "/dificultades-vinculares/", "/trauma/")]),
        ("Recursos", ["/recursos/", "/por-donde-empezar/", "/tests/", "/test-de-eneagrama/", "/test-de-tipos-psicologicos/", "/test-de-estilos-de-apego/", "/test-de-mecanismos-de-defensa/", "/test-de-afrontamiento-del-estres/", "/escala-de-ansiedad-gad-7/", "/escala-de-animo-phq-9/", "/escala-de-autoestima-rosenberg/", "/ejercicio-desiderativo/", "/ejercicio-persona-bajo-la-lluvia/", "/ejercicio-frases-incompletas/", "/laboratorios/"] + [l["ruta"] for l in LABORATORIOS] + [ruta_categoria(c) for c in cats_con]),
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
- Pagos desde el exterior: Remitly, Western Union, Global66 u otras plataformas de pago internacional, a acordar al comienzo.
- Obras sociales: no atiende a través de obras sociales ni prepagas; trabaja con reintegro (el paciente abona la sesión y recibe una factura con los datos que pide su cobertura para solicitar el reintegro).
- Contacto: WhatsApp {C["whatsapp_visible"]} ({WA_BASE}). Formulario: {URL}/contacto/
- Redes: Instagram {R["instagram"]} · Facebook {R["facebook"]} · LinkedIn {R["linkedin"]}
- Opiniones de pacientes: más de 100 reseñas en Google y 80 en Doctoralia ({R["doctoralia"]}). Selección: {URL}/opiniones/
- También integra el equipo de Centro Sinapsis (Berazategui), con atención online: {C["centro_sinapsis"]}

## Enfoque
El eje de su trabajo es la psicología analítica de C. G. Jung (terapia de orientación junguiana: sueños, símbolos, sombra, proceso de individuación), sobre una base psicoanalítica y psicodinámica. Desde una perspectiva integrativa, dialoga con la terapia sistémica, la Gestalt, la terapia narrativa y la terapia cognitivo-conductual, y toma recursos de otros marcos cuando son pertinentes. Estas corrientes son marcos teóricos de referencia: no se presentan como especializaciones ni certificaciones.

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
- [Psicoterapia para adultos]({URL}/psicoterapia-para-adultos/)
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

    # buscar.json: índice para el buscador del sitio (/buscar/)
    rutas_lab = {l["ruta"] for l in LABORATORIOS}
    arts = {a["ruta"]: a for a in ARTICULOS if a["publicado"]}
    rutas_cat = {ruta_categoria(c) for c in CATEGORIAS}
    indice = []
    for ruta, _, _ in mapa:
        if ruta in rutas_cat or ruta in ("/mapa-del-sitio/", "/privacidad/", "/buscar/"):
            continue
        f = SALIDA / ("index.html" if ruta == "/" else ruta.strip("/") + "/index.html")
        h = f.read_text(encoding="utf-8")
        desc = re.search(r'<meta name="description" content="([^"]*)"', h)
        cuerpo = re.search(r'<main id="contenido">(.*?)</main>', h, re.S).group(1)
        cuerpo = re.sub(r"<(svg|script|style|nav|button|form|aside)\b.*?</\1>", " ", cuerpo, flags=re.S)
        texto = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", cuerpo))).strip()
        if ruta in arts:
            a = arts[ruta]
            indice.append({"t": a["titulo"], "k": "Artículo", "u": ruta, "d": a.get("resumen", ""),
                           "c": a.get("palabras_clave", "") + ", " + a["categoria"], "x": texto[:1000]})
        else:
            indice.append({"t": html.unescape(nombres.get(ruta, ruta)), "k": "Laboratorio" if ruta in rutas_lab else "Página", "u": ruta,
                           "d": html.unescape(desc.group(1)) if desc else "", "c": "", "x": texto[:900 if ruta in rutas_lab else 500]})
    for t in GLOSARIO:
        indice.append({"t": t["termino"], "k": "Glosario", "u": f"/glosario-junguiano/#{slug(t['termino'])}",
                       "d": re.sub(r"\[(.+?)\]\(.+?\)", r"\1", " ".join(t["definicion"])).replace("*", "")[:300], "c": "", "x": ""})
    for q in FAQ:
        r = q["respuesta"] if isinstance(q["respuesta"], str) else " ".join(q["respuesta"])
        indice.append({"t": q["pregunta"], "k": "Pregunta", "u": f"/preguntas-frecuentes/#{q['id']}",
                       "d": re.sub(r"<[^>]+>", "", html.unescape(r))[:300], "c": "", "x": ""})
    (SALIDA / "buscar.json").write_text(json.dumps(indice, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

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
    # Una sola versión canónica: el dominio de Vercel y el dominio sin www redirigen (301) al dominio principal.
    from urllib.parse import urlparse
    host = urlparse(URL).netloc
    otros = [h for h in ("licbongiorno5.vercel.app", host[4:] if host.startswith("www.") else "") if h and h != host]
    vercel = {
        "cleanUrls": True, "trailingSlash": True,
        # Las ramas de trabajo no generan publicaciones en Vercel (ahorra el cupo diario); solo main publica.
        "git": {"deploymentEnabled": {"claude/animaciones": False}},
        "redirects": [{"source": "/:path*", "has": [{"type": "host", "value": h}], "destination": f"{URL}/:path*", "permanent": True} for h in otros],
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
