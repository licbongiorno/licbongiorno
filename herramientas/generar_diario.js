/* Genera assets/descargas/diario-de-suenos.pdf (A4, para imprimir).
   Uso: node herramientas/generar_diario.js  (requiere Playwright) */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(__dirname, '..');
const f64 = (n) => fs.readFileSync(path.join(raiz, 'assets/fonts', n)).toString('base64');
const cfg = JSON.parse(fs.readFileSync(path.join(raiz, 'sitio.json'), 'utf8'));
const web = cfg.url.replace(/^https?:\/\//, '');
const enso = '<svg viewBox="0 0 200 200" width="120" height="120"><path d="M172 70A80 80 0 1 0 178 118" fill="none" stroke="#4A5A3C" stroke-width="7" stroke-linecap="round"/><path d="M160 52A82 82 0 0 0 40 50" fill="none" stroke="#A3B18A" stroke-width="2.5" stroke-linecap="round"/><circle cx="112" cy="110" r="15" fill="#F4A261"/></svg>';
const campo = (t, h) => `<div class="campo"><p>${t}</p><div class="lineas" style="height:${h}mm"></div></div>`;
const entrada = (n) => `<section class="hoja"><div class="cab"><span>Sueño n.º ${n}</span><span>Fecha: ____ / ____ / ________</span></div>
  ${campo('El sueño, tal como lo recuerdo', 70)}
  ${campo('Qué sentí en el sueño y al despertar', 22)}
  ${campo('Imágenes, personajes y lugares que más me llamaron la atención', 26)}
  ${campo('¿Qué me evoca cada imagen? (recuerdos, asociaciones)', 30)}
  ${campo('¿Qué está pasando en mi vida estos días?', 22)}
  <p class="pie">${web}</p></section>`;
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
@font-face{font-family:PF;src:url(data:font/woff2;base64,${f64('playfair-display-normal.woff2')})}
@font-face{font-family:PF;font-style:italic;src:url(data:font/woff2;base64,${f64('playfair-display-italic.woff2')})}
@font-face{font-family:LO;src:url(data:font/woff2;base64,${f64('lora-normal.woff2')})}
@font-face{font-family:MS;src:url(data:font/woff2;base64,${f64('montserrat-normal.woff2')})}
@page{size:A4;margin:0}
body{margin:0;font-family:LO;color:#26241F}
.hoja{width:210mm;height:297mm;box-sizing:border-box;padding:18mm 20mm;page-break-after:always;position:relative;background:#FBF8F3}
.portada{display:flex;flex-direction:column;justify-content:center;background:#F6F1EB}
.portada h1{font-family:PF;font-weight:400;font-size:46pt;line-height:1;margin:16mm 0 6mm}
.portada h1 em{color:#4A5A3C}
.k{font-family:MS;font-size:9pt;letter-spacing:.18em;text-transform:uppercase;color:#4A5A3C}
.portada .bajada{font-size:13pt;line-height:1.6;max-width:140mm;color:#4D493F}
.autor{position:absolute;left:20mm;bottom:18mm;font-family:MS;font-size:9pt;color:#4D493F;line-height:1.6}
.autor b{font-family:PF;font-weight:400;font-size:13pt;color:#26241F}
h2{font-family:PF;font-weight:400;font-size:24pt;margin:0 0 6mm}
.guia p,.guia li{font-size:11pt;line-height:1.65}
.guia li{margin-bottom:2.5mm}
.cita{font-family:PF;font-style:italic;font-size:13pt;border-left:2px solid #F4A261;padding-left:5mm;margin:8mm 0;color:#26241F}
.aviso{font-family:MS;font-size:8.5pt;color:#6B6862;line-height:1.5;position:absolute;left:20mm;right:20mm;bottom:16mm}
.cab{display:flex;justify-content:space-between;font-family:MS;font-size:9pt;letter-spacing:.06em;color:#4A5A3C;border-bottom:1px solid #A3B18A;padding-bottom:3mm;margin-bottom:6mm}
.campo p{font-family:MS;font-size:9pt;font-weight:600;color:#4D493F;margin:4mm 0 2mm}
.lineas{background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 7.6mm,rgba(38,36,31,.18) 7.6mm,rgba(38,36,31,.18) 7.9mm)}
.pie{position:absolute;bottom:10mm;right:20mm;font-family:MS;font-size:8pt;color:#AFAFAF;margin:0}
</style><body>
<section class="hoja portada">${enso}<p class="k">Recurso para imprimir</p><h1>Diario<br><em>de sueños</em></h1>
<p class="bajada">Un cuaderno para escuchar lo que te habita mientras dormís. Para registrar tus sueños, las emociones que despiertan y lo que te evocan, sin buscarles un significado apurado.</p>
<p class="autor"><b>Lic. Nicolás Raúl Bongiorno</b><br>Psicólogo clínico · ${cfg.matricula} · Psicología analítica junguiana<br>${web}</p></section>
<section class="hoja guia"><h2>Cómo usar este diario</h2>
<ol>
<li><strong>Tené el diario cerca de la cama.</strong> Los sueños se desvanecen en minutos: anotá apenas te despertás, antes de levantarte o de mirar el celular.</li>
<li><strong>Escribí lo que recuerdes, aunque sea un fragmento</strong>, una imagen suelta o solo una sensación. No hace falta que tenga sentido.</li>
<li><strong>Usá el presente:</strong> «estoy en una casa…», como si lo estuvieras viviendo. Ayuda a recordar más detalles.</li>
<li><strong>Registrá la emoción.</strong> Suele ser más importante que la trama.</li>
<li><strong>No uses diccionarios de sueños.</strong> El mismo símbolo significa cosas distintas para cada persona. Preguntate qué te evoca a vos.</li>
<li><strong>Prestá atención a lo que se repite:</strong> escenarios, personajes, emociones. Las series de sueños dicen más que un sueño aislado.</li>
<li><strong>Si estás en terapia, llevalo a la sesión.</strong> Los sueños se exploran mejor conversando.</li>
</ol>
<p class="cita">Un sueño no se interpreta de una vez: se conversa con él.</p>
<p>Para Carl Gustav Jung, los sueños son una expresión natural del inconsciente que muestra —en su propio lenguaje de imágenes— lo que nos pasa. Podés leer más en «Los sueños según Jung», en ${web}/recursos/los-suenos-segun-jung/</p>
<p class="aviso">Este diario es un recurso de autoconocimiento y no reemplaza una consulta profesional. Si los sueños te generan mucha angustia o se acompañan de otros síntomas, consultá con un profesional de la salud mental.</p></section>
${[1,2,3,4,5,6,7,8].map(entrada).join('')}
</body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(html); await p.waitForTimeout(500);
  await p.pdf({ path: path.join(raiz, 'assets/descargas/diario-de-suenos.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close(); console.log('PDF generado');
})();
