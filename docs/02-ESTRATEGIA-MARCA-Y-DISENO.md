# Etapa 2 — Identidad, posicionamiento y diseño

## 1. Concepto de marca: «Lo que te habita»

**Idea central.** La terapia como un espacio para comprender lo que nos sucede, reconocer nuestros patrones,
conectar con nuestra historia y encontrar nuevas maneras de habitar la propia vida.

«Lo que te habita» funciona en tres niveles a la vez:

| Nivel | Lectura |
|---|---|
| Clínico | Lo inconsciente: deseos, miedos, marcas de la historia que actúan sin que lo sepamos (psicoanálisis). |
| Simbólico | Imágenes, sueños y arquetipos que buscan expresarse (Jung). |
| Cotidiano | Lo que sentís y todavía no tiene nombre. Accesible para cualquier persona, sin jerga. |

**Propuesta de valor.**
> Psicoterapia con profundidad clínica y calidez humana: un eje psicoanalítico sólido, abierto a otras miradas,
> para comprender lo que te pasa en lugar de solo taparlo. En Alta Gracia y online, en español.

**Diferenciales frente a la competencia local (directorios llenos de fichas iguales):**
1. Profundidad: un enfoque explicado con claridad, no una lista de técnicas.
2. Integración honesta: se distingue eje clínico, marcos en diálogo y lecturas (sin inflar credenciales).
3. Alcance: presencial en Alta Gracia + online para el mundo hispanohablante.
4. Más de 15 años de práctica y 80 opiniones públicas de pacientes.

**Tono de voz.** Voseo rioplatense, primera persona, frases cortas, sin frases motivacionales vacías ni promesas
de resultados. Cercano pero sobrio. Se evita «sanar», «cura», «transformá tu vida en X sesiones».

## 2. Titulares evaluados para el hero

| # | Titular | Evaluación |
|---|---|---|
| **A** | **Lo que te habita también merece ser escuchado.** | **Elegido.** Contiene el concepto de marca, valida a quien lee, y «ser escuchado» nombra exactamente lo que ofrece la terapia psicoanalítica. Memorable y sin jerga. |
| B | Comprender lo que te pasa es empezar a habitar tu vida de otra manera. | Muy fiel al concepto, pero largo para un H1. Se usa como idea en la bajada. |
| C | Hay una historia detrás de lo que sentís. | Potente y psicodinámico; menos propio. Queda como alternativa para campañas. |
| D | Un espacio para escuchar lo que te habita. | Claro pero descriptivo, con menos carga emocional. |
| E | Lo que se repite tiene algo para decirte. | Excelente para el artículo de vínculos y para redes. |

El H1 combina el titular con la intención de búsqueda: un antetítulo «Psicoterapia en Alta Gracia y online»
dentro del mismo `<h1>` aporta las palabras clave sin sacrificar el tono.

## 3. Identidad visual

**Símbolo.** Un *ensō* (círculo zen trazado en un solo gesto) que queda **abierto**, con una **semilla terracota**
en su interior:
- El círculo remite al *sí-mismo* y al mandala junguiano: la totalidad, sin decirlo literalmente.
- La apertura dice «proceso»: algo que no se cierra sobre sí mismo.
- La semilla es «lo que te habita»: algo propio, vivo, que puede crecer.

**Paleta** (con roles para cumplir contraste WCAG AA):

| Token | Color | Uso |
|---|---|---|
| Beige cálido | `#F6F1EB` | Fondo general (con textura de papel muy sutil) |
| Papel | `#FBF8F3` | Tarjetas y secciones alternas |
| Salvia | `#A3B18A` | Ilustración, detalles, bordes |
| Salvia profunda | `#4A5A3C` | Botones, énfasis tipográfico (contraste 7:1) |
| Bosque | `#2E3927` | Secciones oscuras (reseñas, CTA final) |
| Terracota | `#F4A261` | Acento puntual: semilla, cifras, comillas. Nunca texto sobre claro. |
| Terracota profunda | `#9A4E1C` | Enlaces y numeración (contraste AA sobre beige) |
| Gris | `#AFAFAF` / `#6B6862` | Piedras de la ilustración / textos secundarios |

**Tipografía.**
- *Playfair Display* — titulares, con itálica en salvia para la palabra emocional de cada título.
- *Lora* — texto de lectura: serif cálida, muy legible en pantalla; refuerza el carácter editorial.
- *Montserrat* — navegación, botones, etiquetas y datos (en mayúsculas espaciadas).
- Las tres se sirven desde el propio sitio (sin Google Fonts en tiempo de ejecución): más rápido y sin rastreo.

**Ilustración en lugar de fotos de stock.** Composición propia en SVG dentro de un **arco** (umbral arquitectónico):
luz natural, piedras apiladas en equilibrio (la de arriba, terracota), agua con ondas que se expanden lentamente y
una rama con hojas. Evita personas sonriendo, manos, cerebros y estética hospitalaria. Cuando llegue tu foto
profesional, ocupa el mismo arco con solo completar `"foto"` en `sitio.json`.

## 4. Arquitectura del sitio

```
/                         Inicio (hero, concepto, sobre mí, enfoque, motivos, proceso, modalidades, reseñas, FAQ, recursos, contacto)
/sobre-mi/                Presentación en primera persona (ProfilePage)
/enfoque/                 Eje psicoanalítico + 6 corrientes + otras perspectivas
/motivos-de-consulta/     14 motivos
/psicologo-alta-gracia/   Landing local (presencial)
/terapia-online/          Landing nacional/internacional (online, exterior)
/preguntas-frecuentes/    12 preguntas (FAQPage)
/recursos/                Blog: categorías + artículos
/recursos/<artículo>/     Artículos (se publican al pasar a estado «publicado»)
/contacto/                Canales + formulario + aviso de privacidad y emergencias
/privacidad/              Ley 25.326
```

Navegación: 6 ítems + «Solicitar una consulta» fijo. «Modalidades» abre un submenú accesible (teclado y Escape).

## 5. Experiencia de usuario y conversión

- **Camino principal:** Hero → (comprender) Concepto/Sobre mí/Enfoque → (identificarse) Motivos → (decidir) Modalidades → Reseñas → Contacto.
- **CTA sin saturar:** cabecera (fijo), hero, después de motivos y de modalidades (versión clara, menos invasiva),
  final de cada artículo, cierre de la home. WhatsApp flotante en todas las páginas, con mensaje inicial distinto
  según la página (general, presencial, online, exterior).
- **Formulario mínimo:** nombre, contacto, modalidad, ciudad, mensaje opcional + consentimiento. Advierte que no es
  para emergencias ni para datos clínicos.
- **Movimiento:** entrada escalonada del titular, revelado suave al desplazarse, ondas de agua lentas, parallax
  moderado solo en escritorio, transiciones entre páginas (View Transitions), hover en tarjetas y botones.
  Con `prefers-reduced-motion` se desactiva todo. Sin JavaScript, el sitio se lee completo.
