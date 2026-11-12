"""«Voces que nos habitan»: biblioteca de citas verificadas. Lo usa build.py.

Datos (todo en contenido/voces/):
  autores.json   registro de autores (ficha de los incorporados; los demás, pendientes con motivo)
  citas/<slug>.json   citas de cada autor (texto original, traducción, fuente, temas, estado)
  fuentes.json   fuentes primarias de dominio público
  temas.json     nombres y categorías de los temas (extensible)

Solo se publican las citas con "publicada": true y "verificada": true (la verificación la escribe
herramientas/verificar_voces.py). Agregar un autor o una cita actualiza solos el centro, el índice de
autores, los filtros, los contadores, las páginas de tema, el sitemap y el buscador.
"""
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
DIR = RAIZ / "contenido/voces"
RUTA = "/recursos/voces-que-nos-habitan/"
RUTA_AUTORES = RUTA + "autores/"
RUTA_TEMAS = RUTA + "temas/"
MIN_TEMA_CITAS, MIN_TEMA_AUTORES = 8, 3  # una página de tema solo existe si tiene contenido suficiente y miradas distintas
IDIOMAS = {"la": "latín", "de": "alemán", "en": "inglés", "grc": "griego", "fr": "francés", "it": "italiano", "es": "castellano", "zh": "chino", "pi": "pali"}
VERSION_DE = {"en": "inglesa", "de": "alemana", "fr": "francesa", "la": "latina", "es": "castellana", "it": "italiana"}
EPOCAS = {"clasico": "Clásicos", "moderno": "Modernos", "contemporaneo": "Contemporáneos"}
# Enlaces discretos desde los temas hacia laboratorios y recursos del sitio.
TEMA_ENLACES = {
    "emociones": ("/laboratorio-rueda-de-las-emociones/", "La rueda de las emociones"),
    "regulacion-emocional": ("/laboratorio-respirar-volver-al-presente/", "Respirar, volver al presente"),
    "ira": ("/laboratorio-rueda-de-las-emociones/", "La rueda de las emociones"),
    "miedo": ("/laboratorio-rueda-de-las-emociones/", "La rueda de las emociones"),
    "angustia": ("/laboratorio-respirar-volver-al-presente/", "Respirar, volver al presente"),
    "presencia": ("/laboratorio-respirar-volver-al-presente/", "Respirar, volver al presente"),
    "vinculos": ("/laboratorio-mi-mapa-de-vinculos/", "Mi mapa de vínculos"),
    "amistad": ("/laboratorio-mi-mapa-de-vinculos/", "Mi mapa de vínculos"),
    "familia": ("/laboratorio-mi-mapa-de-vinculos/", "Mi mapa de vínculos"),
    "autoconocimiento": ("/el-mapa-de-lo-que-me-habita/", "El mapa de lo que me habita"),
    "identidad": ("/el-mapa-de-lo-que-me-habita/", "El mapa de lo que me habita"),
    "deseo": ("/el-mapa-de-lo-que-me-habita/", "El mapa de lo que me habita"),
    "duelo": ("/duelo-y-perdidas/", "Duelo y pérdidas"),
    "perdida": ("/duelo-y-perdidas/", "Duelo y pérdidas"),
    "inconsciente": ("/recursos/psicoquiz/", "PsicoQuiz"),
}


def _leer(nombre):
    return json.loads((DIR / nombre).read_text(encoding="utf-8"))


def epoca(x):
    return "clasico" if x < 1500 else ("moderno" if x < 1900 else "contemporaneo")


def cargar(mapa_autores):
    """Devuelve la biblioteca lista para publicar, o None si todavía no hay datos."""
    if not (DIR / "autores.json").exists():
        return None
    reg, fuentes, temas_cfg = _leer("autores.json"), _leer("fuentes.json"), _leer("temas.json")
    orden_fuentes = list(fuentes)
    mapa = {a["slug"]: a for a in (mapa_autores or {}).get("autores", [])}
    escuelas = {e["id"]: e["nombre"] for e in (mapa_autores or {}).get("escuelas", [])}
    autores = []
    for a in reg["autores"]:
        if a.get("estado") != "incorporado":
            continue
        p = DIR / "citas" / f"{a['slug']}.json"
        if not p.exists():
            continue
        citas = []
        for c in json.loads(p.read_text(encoding="utf-8")):
            if not (c.get("publicada") and c.get("verificada")) or c.get("tipo") in ("dudosa", "parafrasis"):
                continue
            f = fuentes[c["fuente"]]
            c = dict(c, obra=f.get("titulo_es", f["titulo"]), obra_original=f["titulo"], anio=f.get("anio_texto", str(f["anio"])),
                     idioma=f.get("idioma"), idioma_obra=f.get("idioma_original", f.get("idioma")), edicion=f.get("edicion", ""),
                     traductor=f.get("traductor", ""))
            citas.append(c)
        if not citas:
            continue
        citas.sort(key=lambda c: (orden_fuentes.index(c["fuente"]), c["id"]))
        m = mapa.get(a["slug"], {})
        autores.append(dict(a, citas=citas, escuela=m.get("escuela", ""), escuela_nombre=escuelas.get(m.get("escuela", ""), ""),
                            anios=m.get("anios", ""), x=m.get("x", 0), epoca=a.get("epoca") or epoca(m.get("x", 0)),
                            resumen=m.get("resumen", ""), ruta=f"{RUTA_AUTORES}{a['slug']}/"))
    if not autores:
        return None
    todas = [c for a in autores for c in a["citas"]]
    por_autor = {a["slug"]: a for a in autores}
    for a in autores:
        for c in a["citas"]:
            c["autor"] = a["slug"]
    conteo = {}
    for c in todas:
        for t in c["temas"]:
            conteo.setdefault(t, {"citas": 0, "autores": set()})
            conteo[t]["citas"] += 1
            conteo[t]["autores"].add(c["autor"])
    nombres_tema = {t: v[0] for t, v in temas_cfg["temas"].items()}
    categoria_tema = {t: v[1] for t, v in temas_cfg["temas"].items()}
    temas = {}
    for t, v in sorted(conteo.items(), key=lambda kv: -kv[1]["citas"]):
        temas[t] = {"slug": t, "nombre": nombres_tema.get(t, t.replace("-", " ").capitalize()),
                    "categoria": categoria_tema.get(t, "existencia"), "citas": v["citas"], "autores": sorted(v["autores"]),
                    "pagina": v["citas"] >= MIN_TEMA_CITAS and len(v["autores"]) >= MIN_TEMA_AUTORES}
    pendientes = [a for a in reg["autores"] if a.get("estado") != "incorporado"]
    return {"autores": autores, "por_autor": por_autor, "citas": todas, "temas": temas,
            "categorias": temas_cfg["_categorias"], "pendientes": pendientes, "mapa": mapa, "fuentes": fuentes}


# --------------------------------------------------------------------------- HTML
def _comillas(t):
    """La cita va entre comillas latinas; las comillas internas pasan a ser inglesas."""
    return t.replace("«", "“").replace("»", "”")


def atribucion(c, a):
    partes = [a["nombre"], c["obra"] + f" ({c['anio']})"]
    if c.get("ubicacion"):
        partes.append(c["ubicacion"])
    return ", ".join(partes)


def nota_traduccion(c):
    if c["idioma"] != c["idioma_obra"]:
        return f"Traducción propia de Lo que te habita, a partir de la versión {VERSION_DE.get(c['idioma'], c['idioma'])} de {c['traductor']}; original en {IDIOMAS.get(c['idioma_obra'], c['idioma_obra'])}."
    return f"Traducción propia de Lo que te habita; original en {IDIOMAS.get(c['idioma'], c['idioma'])}."


def cita_html(B, V, c, con_autor=True, nivel="h3"):
    esc = B.esc
    a = V["por_autor"][c["autor"]]
    temas = "".join(
        (f'<li><a href="{RUTA_TEMAS}{t}/">{esc(V["temas"][t]["nombre"])}</a></li>' if V["temas"][t]["pagina"]
         else f'<li><span>{esc(V["temas"][t]["nombre"])}</span></li>') for t in c["temas"])
    nombre_autor = f'<a href="{a["ruta"]}">{esc(a["nombre"])}</a>' if con_autor else esc(a["nombre"])
    ubic = f', {esc(c["ubicacion"])}' if c.get("ubicacion") else ""
    nota = f'<p class="vo-cita__nota">{esc(c["nota"])}</p>' if c.get("nota") else ""
    frag = ' <span class="vo-cita__frag">(fragmento)</span>' if c.get("fragmento") else ""
    return f'''<figure class="vo-cita" id="cita-{c["id"]}" data-vo-cita="{c["id"]}" data-temas="{" ".join(c["temas"])}" data-fuente="{c["fuente"]}">
  <blockquote><p>«{esc(_comillas(c["traduccion"]))}»</p></blockquote>
  <figcaption class="vo-cita__pie">— {nombre_autor}, <cite>{esc(c["obra"])}</cite> ({esc(c["anio"])}){ubic}</figcaption>
  {nota}
  <details class="vo-cita__original"><summary>Texto original y fuente</summary>
    <p lang="{c["idioma"]}">«{esc(_comillas(c["original"]))}»{frag}</p>
    <p class="vo-cita__fuente"><cite lang="{c["idioma"]}">{esc(c["obra_original"])}</cite>{ubic}. {esc(c["edicion"])}. <a href="{esc(c["url"])}" target="_blank" rel="noopener nofollow">Ver la fuente</a></p>
    <p class="vo-cita__tipo">{esc(nota_traduccion(c))} Cita textual verificada en la fuente.</p>
  </details>
  <ul class="vo-temas" aria-label="Temas">{temas}</ul>
  <div class="vo-acciones" data-vo-acciones></div>
</figure>'''


def _icono(nombre):
    trazos = {
        "azar": '<path d="M4 7h3.5c2 0 3 1 4 2.6l1.5 2.8c1 1.6 2 2.6 4 2.6H20M4 17h3.5c1.3 0 2.2-.4 2.9-1.1M14.1 8.1C14.8 7.4 15.7 7 17 7h3M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/>',
        "sol": '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    }[nombre]
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{trazos}</svg>'


def _datos_js(B, V):
    """public/assets/js/voces-datos.js: solo citas publicadas y verificadas."""
    autores = [{"s": a["slug"], "n": a["nombre"], "r": a["ruta"], "y": a["anios"], "e": a["escuela"], "en": a["escuela_nombre"],
                "p": a["epoca"], "d": a.get("disciplinas", [])} for a in V["autores"]]
    temas = {t: [v["nombre"], v["pagina"]] for t, v in V["temas"].items()}
    citas = [{"i": c["id"], "a": c["autor"], "t": _comillas(c["traduccion"]), "o": _comillas(c["original"]), "l": c["idioma"],
              "ob": c["obra"], "an": c["anio"], "u": c.get("ubicacion", ""), "te": c["temas"]} for c in V["citas"]]
    datos = {"autores": autores, "temas": temas, "citas": citas, "ruta": RUTA, "temasRuta": RUTA_TEMAS,
             "escuelas": sorted({(a["escuela"], a["escuela_nombre"]) for a in V["autores"] if a["escuela"]}),
             "epocas": [[k, v] for k, v in EPOCAS.items() if any(a["epoca"] == k for a in V["autores"])]}
    return "window.VOCES=" + json.dumps(datos, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";\n"


def _selector_origen(B, V, id_):
    esc = B.esc
    op_aut = "".join(f'<option value="a:{a["slug"]}">{esc(a["nombre"])}</option>' for a in sorted(V["autores"], key=lambda a: a["nombre"]))
    escuelas = sorted({(a["escuela"], a["escuela_nombre"]) for a in V["autores"] if a["escuela"]}, key=lambda e: e[1])
    op_esc = "".join(f'<option value="e:{e}">{esc(n)}</option>' for e, n in escuelas)
    op_epo = "".join(f'<option value="p:{k}">{v}</option>' for k, v in EPOCAS.items() if any(a["epoca"] == k for a in V["autores"]))
    op_tem = "".join(f'<option value="t:{t}">{esc(v["nombre"])} ({v["citas"]})</option>'
                     for t, v in sorted(V["temas"].items(), key=lambda kv: kv[1]["nombre"]) if v["citas"] >= 3)
    return (f'<label class="vo-campo"><span>Elegir entre</span><select id="{id_}" data-vo-origen>'
            f'<option value="">Todas las voces</option><optgroup label="Un autor">{op_aut}</optgroup>'
            f'<optgroup label="Una escuela">{op_esc}</optgroup><optgroup label="Una época">{op_epo}</optgroup>'
            f'<optgroup label="Un tema">{op_tem}</optgroup></select></label>')


def _dia(V, iso):
    """Misma regla que voces.js: una cita por fecha, igual para todas las personas ese día."""
    h = 2166136261
    for ch in iso:
        h = ((h ^ ord(ch)) * 16777619) & 0xFFFFFFFF
    orden = sorted(V["citas"], key=lambda c: c["id"])
    return orden[h % len(orden)]


def _miradas(B, V, tema):
    """Una cita por autor sobre un mismo tema."""
    elegidas = []
    for a in V["autores"]:
        c = next((c for c in a["citas"] if tema in c["temas"]), None)
        if c:
            elegidas.append(c)
    return "".join(cita_html(B, V, c) for c in elegidas)


def _tarjeta_autor(B, V, a):
    esc = B.esc
    disc = ", ".join(a.get("disciplinas", []))
    return f'''<article class="vo-autor" data-vo-autor data-nombre="{esc(a["nombre"])}" data-disciplina="{esc(disc)}" data-n="{len(a["citas"])}" data-destacado="{1 if a.get("destacado") else 0}" data-fecha="{a.get("incorporado", "")}">
  <p class="vo-autor__escuela">{esc(" · ".join(x for x in (a["escuela_nombre"], a.get("corriente", "")) if x))}</p>
  <h3><a href="{a["ruta"]}">{esc(a["nombre"])}</a></h3>
  <p class="vo-autor__anios">{esc(a["anios"])} · {esc(a.get("nacionalidad", ""))}</p>
  <p>{esc(a.get("resumen", ""))}</p>
  <p class="vo-autor__cuenta"><strong>{len(a["citas"])}</strong> citas verificadas · {esc(disc)}</p>
</article>'''


def _temas_nube(B, V, solo_pagina=True):
    esc = B.esc
    items = [(t, v) for t, v in V["temas"].items() if v["pagina"] or not solo_pagina]
    return "".join(f'<li><a href="{RUTA_TEMAS}{t}/">{esc(v["nombre"])} <span>{v["citas"]}</span></a></li>' for t, v in items)


def _pie_metodo(B, V):
    n_aut = len(V["autores"])
    return f'''<section class="seccion" aria-labelledby="t-metodo"><div class="contenedor--texto prosa">
  <h2 id="t-metodo">Cómo elegimos y verificamos las citas</h2>
  <p>En internet circulan miles de frases atribuidas a autores que nunca las escribieron. Por eso esta biblioteca sigue reglas estrictas:</p>
  <ul>
    <li><strong>Solo citas textuales comprobadas.</strong> Cada frase se cotejó, palabra por palabra, con una edición de la obra original. Junto a cada cita está el texto original, la obra, la ubicación exacta y un enlace a la fuente.</li>
    <li><strong>Traducciones propias, señaladas como tales.</strong> Las versiones en castellano son nuestras. Cuando no citamos la lengua original (el griego de Marco Aurelio y Epicteto, el chino del Tao Te Ching, el pali del Dhammapada), usamos una traducción clásica de dominio público y lo indicamos en cada cita.</li>
    <li><strong>Sin atribuciones dudosas ni paráfrasis presentadas como citas.</strong> Las frases virales que no figuran en la obra, o que el autor tomó de otro, quedaron afuera.</li>
    <li><strong>Obras de dominio público.</strong> Por ahora reunimos autores cuya obra ya es de libre uso. Otros autores del sitio se irán sumando cuando podamos hacerlo con el mismo cuidado.</li>
  </ul>
  <p>Hoy la biblioteca reúne <strong>{len(V["citas"])} citas verificadas</strong> de {n_aut} {"autor" if n_aut == 1 else "autores"}. Si encontrás un error, <a href="/contacto/">escribinos</a>.</p>
</div></section>'''


def _schema_cita(B, c, a, persona_id):
    return {"@type": "Quotation", "@id": f"{B.URL}{a['ruta']}#cita-{c['id']}", "text": c["traduccion"], "inLanguage": "es",
            "creator": {"@id": persona_id}, "isBasedOn": {"@type": "Book", "name": c["obra_original"], "inLanguage": c["idioma"]},
            "citation": f"{c['obra']} ({c['anio']}){', ' + c['ubicacion'] if c.get('ubicacion') else ''}"}


def construir(B, V, mapa, nombres, fechas, imagenes):
    """Escribe todas las páginas de la biblioteca y su archivo de datos."""
    esc, pagina, portada, reemplazos, escribir = B.esc, B.pagina, B.portada, B.reemplazos, B.escribir
    (B.SALIDA / "assets/js/voces-datos.js").write_text(_datos_js(B, V), encoding="utf-8")
    scripts = ["lab-base.js", "voces-datos.js", "voces.js"]
    hoy = _dia(V, B.HOY)
    total, n_aut = len(V["citas"]), len(V["autores"])
    tema_inicial = max((t for t, v in V["temas"].items() if len(v["autores"]) == n_aut), key=lambda t: V["temas"][t]["citas"], default=next(iter(V["temas"])))
    op_miradas = "".join(f'<option value="{t}"{" selected" if t == tema_inicial else ""}>{esc(v["nombre"])}</option>'
                         for t, v in sorted(V["temas"].items(), key=lambda kv: kv[1]["nombre"]) if len(v["autores"]) >= 2)
    def unir(*rutas):
        for r, n in rutas:
            nombres[r] = n
            fechas[r] = B.HOY

    # ---------------- Centro
    migas = [("Recursos", "/recursos/"), ("Voces que nos habitan", RUTA)]
    nombres_v = [a["nombre"] for a in V["autores"]]
    quienes = ", ".join(nombres_v[:4]) + " y otros" if n_aut > 4 else (", ".join(nombres_v[:-1]) + " y " + nombres_v[-1] if n_aut > 1 else nombres_v[0])
    meta = {"titulo": "Voces que nos habitan: citas verificadas de grandes pensadores",
            "descripcion": f"{total} citas de {quienes}, verificadas en su obra original, con el texto, la fuente y la ubicación exacta."[:155],
            "migas": migas, "tipo_pagina": "CollectionPage", "con_consultorio": False, "scripts": scripts,
            "antetitulo": "Recursos · Biblioteca", "h1": "Voces que <em>nos habitan</em>",
            "bajada": "Frases de pensadores que ayudaron a comprender la mente, las emociones y los vínculos. Cada una, verificada en su obra original.",
            "schema_extra": [{"@type": "ItemList", "@id": f"{B.URL}{RUTA}#autores", "name": "Autores de Voces que nos habitan",
                              "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": f"{B.URL}{a['ruta']}", "name": a["nombre"]}
                                                  for i, a in enumerate(V["autores"])]}]}
    aut_dest = "".join(_tarjeta_autor(B, V, a) for a in sorted(V["autores"], key=lambda a: (not a.get("destacado"), a["x"])))
    cuerpo = portada(meta) + f'''<div class="vo" data-vo-centro>
<section class="seccion vo-seccion" aria-labelledby="t-hoy" style="padding-top:0"><div class="contenedor">
  <div class="vo-hoy revelar">
    <p class="vo-hoy__marca">{_icono("sol")} Una idea para hoy · <time data-vo-hoy-fecha datetime="{B.HOY}"></time></p>
    <h2 id="t-hoy" class="visualmente-oculto">Una idea para hoy</h2>
    <div data-vo-hoy>{cita_html(B, V, hoy)}</div>
    <p class="vo-hoy__ayuda">La misma idea para todas las personas que entren hoy. Mañana, otra.</p>
  </div>
</div></section>

<section class="seccion vo-seccion" aria-labelledby="t-azar"><div class="contenedor">
  <div class="encabezado-seccion revelar"><p class="antetitulo">Sorprendeme</p><h2 id="t-azar">Una voz <em>al azar</em></h2>
    <p>Pedí una cita sorpresa entre todas, o elegí de qué autor, escuela, época o tema querés que venga.</p></div>
  <div class="vo-azar" data-vo-azar>
    <div class="vo-azar__controles">{_selector_origen(B, V, "vo-origen")}<button class="boton" type="button" data-vo-sorprender>{_icono("azar")} Sorprendeme</button></div>
    <div class="vo-azar__cita" data-vo-azar-cita aria-live="polite"><p class="vo-vacio">Tocá «Sorprendeme» para recibir una cita.</p></div>
  </div>
</div></section>

<section class="seccion seccion--papel vo-seccion" aria-labelledby="t-miradas"><div class="contenedor">
  <div class="encabezado-seccion revelar"><p class="antetitulo">Un tema, distintas miradas</p><h2 id="t-miradas">Lo mismo, <em>visto por varios</em></h2>
    <p>Elegí un tema y compará qué dijo cada autor. Coinciden, se contradicen, se completan.</p></div>
  <label class="vo-campo vo-campo--linea"><span>Tema</span><select data-vo-miradas-tema>{op_miradas}</select></label>
  <div class="vo-lista vo-lista--miradas" data-vo-miradas>{_miradas(B, V, tema_inicial)}</div>
</div></section>

<section class="seccion vo-seccion" aria-labelledby="t-autores"><div class="contenedor">
  <div class="encabezado-seccion revelar"><p class="antetitulo">Autores</p><h2 id="t-autores">Las <em>voces</em></h2></div>
  <div class="vo-autores">{aut_dest}</div>
  <p class="vo-mas"><a class="boton boton--secundario" href="{RUTA_AUTORES}">Ver todos los autores</a></p>
</div></section>

<section class="seccion seccion--papel vo-seccion" aria-labelledby="t-temas"><div class="contenedor">
  <div class="encabezado-seccion revelar"><p class="antetitulo">Temas</p><h2 id="t-temas">Explorar <em>por tema</em></h2></div>
  <ul class="vo-nube">{_temas_nube(B, V)}</ul>
</div></section>

<section class="seccion vo-seccion" aria-labelledby="t-favoritas" data-vo-favoritas-seccion hidden><div class="contenedor">
  <div class="encabezado-seccion"><p class="antetitulo">Guardadas en este navegador</p><h2 id="t-favoritas">Tus <em>favoritas</em></h2>
    <p>Se guardan solo en este dispositivo. Nadie más las ve.</p></div>
  <div class="vo-lista" data-vo-favoritas></div>
</div></section>
{_pie_metodo(B, V)}
<section class="seccion" style="padding-top:0"><div class="contenedor">
  <div class="descarga descarga--lab"><p><strong>Para seguir explorando</strong>Las palabras de otros pueden abrir preguntas propias. Probá <a href="/laboratorio-rueda-de-las-emociones/">la rueda de las emociones</a>, <a href="/laboratorio-mi-mapa-de-vinculos/">tu mapa de vínculos</a> o <a href="/recursos/psicoquiz/">el PsicoQuiz</a>.</p><a class="boton boton--chico" href="/laboratorios/">Ver los laboratorios</a></div>
</div></section>
</div>'''
    escribir(RUTA, pagina(meta, reemplazos(cuerpo, RUTA), RUTA))
    mapa.append((RUTA, 0.7, "weekly"))
    unir((RUTA, "Voces que nos habitan"))

    # ---------------- Índice de autores
    migas_a = migas + [("Autores", RUTA_AUTORES)]
    disciplinas = sorted({d for a in V["autores"] for d in a.get("disciplinas", [])})
    pend = V["pendientes"]
    pend_html = "".join(
        f'<li>{esc(V["mapa"].get(p["slug"], {}).get("corto", p["slug"]))} <span>{esc(V["mapa"].get(p["slug"], {}).get("anios", ""))}</span></li>'
        for p in sorted(pend, key=lambda p: V["mapa"].get(p["slug"], {}).get("x", 0)))
    meta_a = {"titulo": "Autores · Voces que nos habitan", "descripcion": f"Los {n_aut} autores de la biblioteca de citas verificadas: biografía, obras, aportes a la psicología y todas sus frases con la fuente original.",
              "migas": migas_a, "tipo_pagina": "CollectionPage", "con_consultorio": False, "scripts": scripts,
              "antetitulo": "Voces que nos habitan", "h1": "Los <em>autores</em>", "bajada": "Quiénes fueron, qué aportaron y qué dijeron, con sus palabras verificadas."}
    cuerpo_a = portada(meta_a) + f'''<div class="vo"><section class="seccion" style="padding-top:0"><div class="contenedor">
  <div class="vo-filtros" data-vo-indice>
    <label class="vo-campo vo-campo--busca"><span>Buscar</span><input type="search" data-vo-buscar placeholder="Nombre, escuela, disciplina…" autocomplete="off"></label>
    <label class="vo-campo"><span>Disciplina</span><select data-vo-disciplina><option value="">Todas</option>{"".join(f"<option>{esc(d)}</option>" for d in disciplinas)}</select></label>
    <label class="vo-campo"><span>Ordenar</span><select data-vo-orden>
      <option value="destacado">Destacados</option><option value="alfa">Alfabético</option><option value="disciplina">Por disciplina</option>
      <option value="n">Más citas</option><option value="fecha">Incorporados recientemente</option></select></label>
    <p class="vo-estado" data-vo-estado aria-live="polite"></p>
  </div>
  <div class="vo-autores" data-vo-autores>{aut_dest}</div>
  <details class="vo-pendientes"><summary>Autores en preparación ({len(pend)})</summary>
    <p>Son los autores que aparecen en otros recursos del sitio. Se van a sumar cuando podamos verificar al menos 50 citas en sus obras y cuando sus derechos lo permitan. Muchos tienen obra protegida por derechos de autor, por lo que no publicamos colecciones de sus frases.</p>
    <ul>{pend_html}</ul></details>
  <p class="vo-mas"><a href="{RUTA}">Volver a Voces que nos habitan</a></p>
</div></section></div>'''
    escribir(RUTA_AUTORES, pagina(meta_a, reemplazos(cuerpo_a, RUTA_AUTORES), RUTA_AUTORES))
    mapa.append((RUTA_AUTORES, 0.6, "monthly"))
    unir((RUTA_AUTORES, "Autores de Voces que nos habitan"))

    # ---------------- Ficha de cada autor
    for a in V["autores"]:
        r = a["ruta"]
        persona_id = f"{B.URL}{r}#autor"
        temas_aut = {}
        for c in a["citas"]:
            for t in c["temas"]:
                temas_aut[t] = temas_aut.get(t, 0) + 1
        op_t = "".join(f'<option value="{t}">{esc(V["temas"][t]["nombre"])} ({n})</option>' for t, n in sorted(temas_aut.items(), key=lambda kv: V["temas"][kv[0]]["nombre"]))
        obras_cit = []
        for c in a["citas"]:
            if c["fuente"] not in obras_cit:
                obras_cit.append(c["fuente"])
        op_o = "".join(f'<option value="{f}">{esc(V["fuentes"][f].get("titulo_es"))}</option>' for f in obras_cit)
        otros = sorted((o for o in V["autores"] if o is not a),
                       key=lambda o: -len(set(temas_aut) & {t for c in o["citas"] for t in c["temas"]}))
        rel = "".join(f'<li><a href="{o["ruta"]}">{esc(o["nombre"])}</a> <span>{esc(o.get("corriente", ""))}</span></li>' for o in otros[:4])
        art = next((x for x in B.ARTICULOS if x["archivo"][:-3] == a["slug"] and x["publicado"]), None)
        art_html = f'<a class="boton boton--secundario boton--chico" href="{art["ruta"]}">Leer el artículo sobre {esc(a["nombre"])}</a>' if art else ""
        bib = "".join(
            f'<li><cite lang="{V["fuentes"][f]["idioma"]}">{esc(V["fuentes"][f]["titulo"])}</cite> ({esc(V["fuentes"][f].get("anio_texto", str(V["fuentes"][f]["anio"])))}). {esc(V["fuentes"][f]["edicion"])}. '
            f'<a href="{esc(V["fuentes"][f].get("url") or V["fuentes"][f]["urls"][0])}" target="_blank" rel="noopener nofollow">Fuente</a></li>' for f in obras_cit)
        citas_html = "".join(cita_html(B, V, c, con_autor=False) for c in a["citas"])
        migas_r = migas_a + [(a["nombre"], r)]
        persona = {"@type": "Person", "@id": persona_id, "name": a["nombre_completo"], "description": a["bio"],
                   "knowsAbout": a.get("disciplinas", [])}
        if art:
            persona["subjectOf"] = {"@id": f'{B.URL}{art["ruta"]}#articulo'}
        meta_r = {"titulo": f"{a['nombre']}: {len(a['citas'])} citas verificadas | Voces que nos habitan"[:70],
                  "descripcion": f"Frases de {a['nombre']} verificadas en su obra original, con traducción, fuente y ubicación exacta. Biografía, obras y aportes a la psicología.",
                  "migas": migas_r, "tipo_pagina": "CollectionPage", "con_consultorio": False, "scripts": scripts,
                  "antetitulo": "Voces que nos habitan · " + (a.get("corriente") or ""), "h1": esc(a["nombre"]),
                  "bajada": esc(f'{a["anios"]} · {a.get("nacionalidad", "")} · {", ".join(a.get("disciplinas", []))}'),
                  "schema_extra": [persona] + [_schema_cita(B, c, a, persona_id) for c in a["citas"]]}
        cuerpo_r = portada(meta_r) + f'''<div class="vo" data-vo-autor-pagina="{a["slug"]}">
<section class="seccion" style="padding-top:0"><div class="contenedor vo-ficha">
  <div class="vo-ficha__texto prosa">
    <p class="vo-ficha__bio">{esc(a["bio"])}</p>
    <h2>Aportes</h2><ul>{"".join(f"<li>{esc(x)}</li>" for x in a.get("aportes", []))}</ul>
    <h2>Su relación con la psicología</h2><p>{esc(a.get("relacion", ""))}</p>
    <div class="vo-ficha__acciones">{art_html}<a class="boton boton--secundario boton--chico" href="{B.MAPA_RUTA}">Verlo en el mapa de la psicología</a></div>
  </div>
  <aside class="vo-ficha__datos" aria-label="Datos">
    <dl>
      <dt>Nombre</dt><dd>{esc(a["nombre_completo"])}</dd>
      <dt>Nacimiento</dt><dd>{esc(a.get("nacimiento", ""))}</dd>
      <dt>Muerte</dt><dd>{esc(a.get("muerte", ""))}</dd>
      <dt>Nacionalidad</dt><dd>{esc(a.get("nacionalidad", ""))}</dd>
      <dt>Disciplinas</dt><dd>{esc(", ".join(a.get("disciplinas", [])))}</dd>
      <dt>Corriente</dt><dd>{esc(a.get("corriente", ""))}</dd>
      <dt>Citas verificadas</dt><dd>{len(a["citas"])}</dd>
    </dl>
    <h2>Obras principales</h2><ul>{"".join(f"<li>{esc(x)}</li>" for x in a.get("obras", []))}</ul>
  </aside>
</div></section>

<section class="seccion seccion--papel" aria-labelledby="t-citas"><div class="contenedor">
  <div class="encabezado-seccion"><p class="antetitulo">{len(a["citas"])} citas verificadas</p><h2 id="t-citas">Con sus <em>propias palabras</em></h2>
    <p>{esc(a.get("nota_citas", ""))}</p></div>
  <div class="vo-azar vo-azar--autor" data-vo-azar data-vo-fijo="a:{a["slug"]}">
    <button class="boton boton--secundario" type="button" data-vo-sorprender>{_icono("azar")} Una cita de {esc(a["nombre"])} al azar</button>
    <div class="vo-azar__cita" data-vo-azar-cita aria-live="polite"></div>
  </div>
  <div class="vo-filtros" data-vo-filtros>
    <label class="vo-campo vo-campo--busca"><span>Buscar en las citas</span><input type="search" data-vo-buscar placeholder="Una palabra: tiempo, amor, miedo…" autocomplete="off"></label>
    <label class="vo-campo"><span>Tema</span><select data-vo-tema><option value="">Todos</option>{op_t}</select></label>
    <label class="vo-campo"><span>Obra</span><select data-vo-obra><option value="">Todas</option>{op_o}</select></label>
    <label class="vo-campo"><span>Ordenar</span><select data-vo-orden><option value="obra">Por obra</option><option value="breve">Más breves primero</option><option value="larga">Más extensas primero</option><option value="azar">Al azar</option></select></label>
    <p class="vo-estado" data-vo-estado aria-live="polite"></p>
  </div>
  <div class="vo-lista" data-vo-lista>{citas_html}</div>
</div></section>

<section class="seccion" aria-labelledby="t-bib"><div class="contenedor--texto prosa">
  <h2 id="t-bib">Fuentes y bibliografía</h2>
  <ul class="vo-bib">{bib}</ul>
  <h2>Otras voces</h2>
  <ul class="vo-relacionados">{rel}</ul>
  <p><a href="{RUTA}">Volver a Voces que nos habitan</a> · <a href="{RUTA_AUTORES}">Todos los autores</a></p>
</div></section>
</div>'''
        escribir(r, pagina(meta_r, reemplazos(cuerpo_r, r), r))
        mapa.append((r, 0.6, "monthly"))
        unir((r, f"{a['nombre']} · Voces que nos habitan"))

    # ---------------- Páginas de tema (solo las que tienen contenido suficiente)
    con_pagina = [t for t, v in V["temas"].items() if v["pagina"]]
    for t in con_pagina:
        v = V["temas"][t]
        r = f"{RUTA_TEMAS}{t}/"
        citas_t = [c for c in V["citas"] if t in c["temas"]]
        grupos = ""
        for a in V["autores"]:
            propias = [c for c in citas_t if c["autor"] == a["slug"]]
            if propias:
                grupos += f'<h2 class="vo-grupo"><a href="{a["ruta"]}">{esc(a["nombre"])}</a> <span>{len(propias)}</span></h2><div class="vo-lista">{"".join(cita_html(B, V, c, con_autor=False) for c in propias)}</div>'
        vecinos = {}
        for c in citas_t:
            for o in c["temas"]:
                if o != t and V["temas"][o]["pagina"]:
                    vecinos[o] = vecinos.get(o, 0) + 1
        rel = "".join(f'<li><a href="{RUTA_TEMAS}{o}/">{esc(V["temas"][o]["nombre"])}</a></li>' for o, _ in sorted(vecinos.items(), key=lambda kv: -kv[1])[:8])
        enlace = TEMA_ENLACES.get(t)
        extra = f'<div class="descarga descarga--lab"><p><strong>Para llevarlo a tu experiencia</strong>Un recurso del sitio relacionado con este tema.</p><a class="boton boton--chico" href="{enlace[0]}">{esc(enlace[1])}</a></div>' if enlace else ""
        nombres_aut = [V["por_autor"][s]["nombre"] for s in v["autores"]]
        lista_aut = ", ".join(nombres_aut[:-1]) + " y " + nombres_aut[-1] if len(nombres_aut) > 1 else nombres_aut[0]
        lista_corta = lista_aut if len(nombres_aut) <= 3 else ", ".join(nombres_aut[:3]) + " y otros"
        opciones_t = [f"{v['nombre']}: citas verificadas de {lista_corta}", f"{v['nombre']}: {v['citas']} citas verificadas | Voces que nos habitan", f"{v['nombre']}: {v['citas']} citas verificadas"]
        meta_t = {"titulo": next(x for x in opciones_t + [opciones_t[-1]] if len(x) <= 65 or x is opciones_t[-1]),
                  "descripcion": f"{v['citas']} citas sobre {v['nombre'].lower()} de {lista_corta}, verificadas en su obra original, con traducción y fuente."[:158],
                  "migas": migas + [(v["nombre"], r)], "tipo_pagina": "CollectionPage", "con_consultorio": False, "scripts": scripts,
                  "antetitulo": "Voces que nos habitan · Tema", "h1": esc(v["nombre"]),
                  "bajada": esc(f"Un tema, distintas miradas: {v['citas']} citas de {lista_aut}.")}
        cuerpo_t = portada(meta_t) + f'''<div class="vo"><section class="seccion" style="padding-top:0"><div class="contenedor">
  <div class="vo-azar vo-azar--autor" data-vo-azar data-vo-fijo="t:{t}">
    <button class="boton boton--secundario" type="button" data-vo-sorprender>{_icono("azar")} Una cita sobre {esc(v["nombre"].lower())} al azar</button>
    <div class="vo-azar__cita" data-vo-azar-cita aria-live="polite"></div>
  </div>
  {grupos}
  {extra}
  <h2 class="vo-grupo">Temas relacionados</h2><ul class="vo-nube">{rel}</ul>
  <p class="vo-mas"><a href="{RUTA}">Volver a Voces que nos habitan</a></p>
</div></section></div>'''
        escribir(r, pagina(meta_t, reemplazos(cuerpo_t, r), r))
        mapa.append((r, 0.5, "monthly"))
        unir((r, f"{v['nombre']} · Voces que nos habitan"))
    return [RUTA, RUTA_AUTORES] + [a["ruta"] for a in V["autores"]] + [f"{RUTA_TEMAS}{t}/" for t in con_pagina]


def caja_articulo(B, V, slug_):
    """Recuadro discreto en el artículo de un autor que tiene voces publicadas."""
    if not V or slug_ not in V["por_autor"]:
        return ""
    a = V["por_autor"][slug_]
    c = a["citas"][0]
    return f'''<aside class="vo-caja" aria-label="Voces que nos habitan">
  <p class="vo-caja__marca">Voces que nos habitan</p>
  <blockquote><p>«{B.esc(_comillas(c["traduccion"]))}»</p></blockquote>
  <p class="vo-caja__pie">{B.esc(c["obra"])} ({B.esc(c["anio"])}){", " + B.esc(c["ubicacion"]) if c.get("ubicacion") else ""}. Cita verificada en la fuente original.</p>
  <a href="{a["ruta"]}">Leer las {len(a["citas"])} citas de {B.esc(a["nombre"])}</a>
</aside>'''
