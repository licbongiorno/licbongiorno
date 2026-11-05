# SEO, SEO local, GEO y estrategia de contenidos

## 1. Palabras clave y página que las atiende

| Grupo | Búsquedas | Página |
|---|---|---|
| Marca | psicólogo Nicolás Bongiorno · Lic. Nicolás Raúl Bongiorno · psicólogo Bongiorno | `/` · `/sobre-mi/` |
| Local | psicólogo Alta Gracia · psicólogo clínico Alta Gracia · psicoterapia Alta Gracia · psicoanálisis Alta Gracia | `/psicologo-alta-gracia/` |
| Regional | psicólogo Córdoba · psicólogo clínico Córdoba | `/` · `/psicologo-alta-gracia/` |
| Online | terapia psicológica online · psicólogo online Argentina · psicólogo en español online · psicoterapia online en español | `/terapia-online/` |
| Enfoque | psicología integrativa · psicoanálisis · terapia junguiana · psicoterapia psicodinámica | `/enfoque/` |
| Informativas | cómo saber si necesito terapia · ansiedad · sombra Jung · patrones en las relaciones · terapia online desde el exterior | `/recursos/…` |

## 2. Implementado en el código

- `title` (≤ 65 caracteres) y `meta description` (≤ 160) únicas por página; un único H1; jerarquía H2/H3.
- URLs limpias en castellano, con barra final; `canonical` absoluto en cada página.
- Open Graph + Twitter Card con imagen propia 1200×630.
- `sitemap.xml` (solo páginas indexables), `robots.txt` (permite explícitamente a buscadores y a GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended) y **`llms.txt`** con un resumen factual del profesional.
- **Datos estructurados (JSON-LD, un solo grafo por página):**
  `WebSite` · `Person` (matrícula como `EducationalOccupationalCredential`, `alumniOf` UNC, `sameAs` a redes y Doctoralia)
  · `MedicalBusiness`/`ProfessionalService` con dirección, teléfono, mapa y área atendida · `ProfilePage` en Sobre mí ·
  `ContactPage` · `CollectionPage` · `BreadcrumbList` · `FAQPage` (siempre idéntico a las preguntas visibles) · `Article` en cada artículo.
- **No** se usa `Review` ni `AggregateRating`: Google no admite reseñas de la propia entidad ni copiadas de otro sitio.
- Enlazado interno entre motivos, enfoque, modalidades, FAQ y artículos.
- Imágenes: el sitio casi no usa mapas de bits (ilustración SVG); todo `<img>` tiene `alt`.

## 3. SEO local (NAP)

Datos coherentes en todo el sitio y en el marcado:

```
Lic. Nicolás Raúl Bongiorno — Psicólogo clínico
Dean Funes 56, Alta Gracia (5186), Córdoba, Argentina
+54 9 351 657-5261
```

Acciones fuera del sitio, en orden de impacto:
1. **Google Business Profile** a tu nombre (categoría *Psicólogo*), con esta misma dirección, teléfono y la URL del sitio. Subir fotos del consultorio y del ingreso.
2. **Unificar la dirección** en Doctoralia, Mundopsicólogos, psicologos.com.ar, Instagram y Beacons (hoy hay 4 direcciones distintas publicadas).
3. Agregar la URL del sitio en todos esos perfiles (refuerza la entidad para Google y para los asistentes de IA).
4. Pedir opiniones en Google a pacientes que lo deseen, sin incentivos.

## 4. GEO (motores de respuesta: ChatGPT, Gemini, Claude, Perplexity)

Los asistentes citan fuentes **claras, consistentes y verificables**. Por eso:
- Cada página responde de forma literal *quién sos, qué hacés, dónde, cómo y para quién* (primeras líneas, FAQ y `llms.txt`).
- Los mismos datos (nombre, matrícula, universidad, dirección, modalidades) aparecen idénticos en HTML, JSON-LD, `llms.txt` y perfiles externos (`sameAs`).
- Las preguntas frecuentes están redactadas como preguntas reales de pacientes.
- Se diferencia explícitamente eje clínico, marcos en diálogo y lecturas: evita que un asistente te atribuya especializaciones que no tenés.
- Seguimiento sugerido: una vez por mes, preguntar a 3–4 asistentes «¿quién es el psicólogo Nicolás Bongiorno?» y «psicólogo psicoanalista en Alta Gracia» y anotar si aparecés y con qué datos.

## 5. Estrategia de contenidos (12 meses)

**Objetivo:** que el sitio sea una referencia de divulgación en español, con base local (Alta Gracia/Córdoba) y alcance internacional.

**Ritmo sugerido:** 2 artículos por mes, revisados por vos antes de publicar. Cada artículo: 900–1500 palabras,
una pregunta real como título, respuesta directa en el primer párrafo, subtítulos, aviso de que no reemplaza una
consulta, CTA final y enlaces internos a motivos/enfoque.

**Pilares y ejemplos:**

| Pilar | Artículos (ideas) |
|---|---|
| Ansiedad y emociones | Ataques de pánico: qué hacer en el momento · Ansiedad y sueño · La culpa · El enojo |
| Vínculos | Dependencia emocional · Duelo por una separación · Vínculos con padres adultos mayores |
| Jung y psicología analítica | Los sueños según Jung · Arquetipos en la vida cotidiana · Crisis de la mitad de la vida e individuación |
| Psicología contemporánea | Psicoanálisis hoy: mitos y realidades · Qué es la psicoterapia integrativa |
| Salud mental | Cómo acompañar a alguien con depresión · Cuándo consultar a un psiquiatra |
| Desarrollo personal | El sentido según Viktor Frankl · Autoconocimiento sin fórmulas |
| Migración (internacional) | Duelo migratorio · Hacer terapia en tu idioma · Identidad entre dos países |
| Local | Salud mental en Alta Gracia: recursos y dónde pedir ayuda (con fuentes oficiales) |

**Distribución:** cada artículo se convierte en 3–5 piezas para Instagram (carrusel con la idea central, cita, pregunta) que enlazan al sitio.

## 6. Mercado internacional: cuestiones regulatorias a verificar

> Esto **no es asesoramiento legal**. Antes de promocionar activamente la atención en otro país, conviene consultar
> al Colegio de Psicólogos de la Provincia de Córdoba y, si corresponde, a un abogado.

| Jurisdicción | Qué verificar |
|---|---|
| Argentina | Alcance de la matrícula provincial (Córdoba) para atender online a residentes de otras provincias; pautas del Colegio sobre teleasistencia; Ley 26.657 (Salud Mental), Ley 26.529 (Derechos del Paciente), Ley 25.326 (Datos Personales) y normativa de telesalud. |
| España | La psicología sanitaria está regulada (Psicólogo General Sanitario, colegiación). Verificar si la atención a residentes desde el exterior requiere habilitación o reconocimiento del título. |
| Estados Unidos | La licencia es **por estado** y en general se exige estar licenciado en el estado donde se encuentra el paciente; algunos estados prevén excepciones temporales. Considerar también HIPAA para plataformas. |
| Canadá | Regulación **provincial** (colegios de cada provincia); reglas similares a EE. UU. respecto de la ubicación del paciente. |
| Unión Europea | Además de la regulación profesional de cada país, el RGPD para el tratamiento de datos de residentes en la UE. |

**Mientras tanto, el sitio:** no promete atención legal en cualquier país, aclara la matrícula argentina, indica que
cada situación se revisa en la primera conversación y que las urgencias deben atenderse con servicios locales.
