/* Carruseles especiales para Instagram (1080×1350): mapa de psicologías del mundo y línea de tiempo.
   Salida: redes/instagram/<pieza>/01..NN.png + texto.txt. Uso: node herramientas/generar_carruseles_especiales.js */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(raiz, 'sitio.json'), 'utf8'));
const f64 = (n) => fs.readFileSync(path.join(raiz, 'assets/fonts', n)).toString('base64');
const foto = fs.readFileSync(path.join(raiz, cfg.foto)).toString('base64');
const web = cfg.url.replace(/^https?:\/\//, '');
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const md = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\[(.+?)\]\(.+?\)/g, '$1').replace(/\*(.+?)\*/g, '<i>$1</i>');
const ENSO = '<svg viewBox="0 0 200 200" width="64" height="64"><path d="M172 70A80 80 0 1 0 178 118" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><circle cx="112" cy="110" r="16" fill="#F4A261"/></svg>';

const base = `
@font-face{font-family:PF;src:url(data:font/woff2;base64,${f64('playfair-display-normal.woff2')})}
@font-face{font-family:PF;font-style:italic;src:url(data:font/woff2;base64,${f64('playfair-display-italic.woff2')})}
@font-face{font-family:LO;src:url(data:font/woff2;base64,${f64('lora-normal.woff2')})}
@font-face{font-family:MS;src:url(data:font/woff2;base64,${f64('montserrat-normal.woff2')})}
*{box-sizing:border-box}body{margin:0;width:1080px;height:1350px;overflow:hidden;font-family:LO;color:#26241F}
.p{width:1080px;height:1350px;padding:110px 100px;display:flex;flex-direction:column;position:relative}
.k{font-family:MS;font-size:26px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#4A5A3C}
.pie{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-family:MS;font-size:26px;color:#6B6862}
.n{font-family:MS;font-size:24px;letter-spacing:.1em}
h1{font-family:PF;font-weight:400;font-size:96px;line-height:1.04;margin:40px 0 0;letter-spacing:-2px}
h2{font-family:PF;font-weight:400;font-size:64px;line-height:1.12;margin:36px 0 0}
.sub{font-family:PF;font-style:italic;font-size:52px;line-height:1.2;color:#4A5A3C;margin-top:30px}
.txt{font-size:42px;line-height:1.5;margin-top:40px}
.claro{background:#F6F1EB}.papel{background:#FBF8F3}.bosque{background:#2E3927;color:#F6F1EB}
.bosque .k{color:#A3B18A}.bosque .pie{color:#CFCBC0}.bosque h2 em{color:#F4A261}
.arco{position:absolute;right:100px;bottom:200px;width:300px;height:400px;border-radius:150px 150px 22px 22px;overflow:hidden}
.arco img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
.caja{margin-top:44px;padding:44px 48px;border-left:6px solid #4A5A3C;background:#FBF8F3;border-radius:0 24px 24px 0}
.desliza{font-family:MS;font-size:26px;color:#4A5A3C;margin-top:40px}
`;
const mapa = fs.readFileSync(path.join(raiz, 'contenido/mapa-mundi.svg'), 'utf8')
  .replace('<svg ', '<svg style="width:100%;height:auto" ');
const css = base + `
.mapa{margin:50px -60px 0;border-radius:28px;background:#EEF1E8;padding:18px}
.nota{font-size:38px;line-height:1.45;margin-top:44px;color:#4D493F}
.eje{position:relative;margin-top:auto;margin-bottom:60px;height:90px}
.eje:before{content:'';position:absolute;left:0;right:0;top:44px;height:4px;background:#DDE3D2;border-radius:2px}
.eje i{position:absolute;top:36px;width:20px;height:20px;border-radius:50%;background:#A3B18A;margin-left:-10px}
.eje i.on{width:36px;height:36px;top:28px;margin-left:-18px;background:#F4A261;box-shadow:0 0 0 8px #F9D9BD}
.eje span{position:absolute;top:84px;font-family:MS;font-size:22px;color:#6B6862;transform:translateX(-50%)}
.mapa .mm-pais{fill:#ECE3D6;stroke:#FBF8F3;stroke-width:.5}.mapa .mm-activo{fill:#A3B18A}.mapa .mm-marca{fill:#4A5A3C}
.mapa .hl{fill:#F4A261}
.anio{font-family:PF;font-size:150px;line-height:1;color:#4A5A3C;margin-top:50px}
.lista{margin-top:40px;font-size:40px;line-height:1.45}.lista p{margin:0 0 26px}.lista b{font-family:MS;font-size:30px;letter-spacing:.06em;color:#4A5A3C;text-transform:uppercase;display:block;margin-bottom:6px}
`;
function mapaCon(paises) {
  let s = mapa;
  for (const p of paises) s = s.split(`data-pais="${p}"`).join(`data-pais="${p}" class="hl"`).replace(/class="mm-pais mm-activo" d="([^"]+)" data-pais="[^"]+" class="hl"/g, (m) => m);
  // la clase duplicada no es válida: reemplazar el atributo class original
  for (const p of paises) s = s.replace(new RegExp(`class="mm-pais mm-activo"( d="[^"]+")( data-pais="${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}") class="hl"`, 'g'), 'class="mm-pais hl"$1$2');
  return `<div class="mapa">${s}</div>`;
}
const piezas = {
  'psicologias-del-mundo': {
    url: '/psicologias-del-mundo/',
    placas: (pie) => [
      `<div class="p claro"><div class="k">Psicologías del mundo</div><h1>Cada cultura pensó la mente a su manera</h1>${mapaCon([])}<div class="nota">Un recorrido por más de 20 tradiciones: qué tiene investigación, qué es tradición y qué es metáfora.</div><div class="desliza">Deslizá →</div>${pie(1)}</div>`,
      `<div class="p papel"><div class="k">Japón</div><h2>Morita, Naikan y el <em>arugamama</em>: aceptar lo que se siente y actuar igual</h2>${mapaCon(['Japan'])}<div class="nota">Dos psicoterapias con autor, técnica e investigación. Y conceptos culturales como ikigai o wabi-sabi, que son otra cosa.</div>${pie(2)}</div>`,
      `<div class="p claro"><div class="k">Sudáfrica y el África subsahariana</div><h2><em>Ubuntu</em>: «soy porque somos». Y el Friendship Bench, la terapia en un banco de plaza</h2>${mapaCon(['South Africa','Zimbabwe'])}<div class="nota">En Zimbabue, abuelas entrenadas acompañan a personas con depresión. Un ensayo clínico publicado en 2016 mostró buenos resultados.</div>${pie(3)}</div>`,
      `<div class="p papel"><div class="k">Argentina y América Latina</div><h2>Pichon-Rivière, Marie Langer, la psicología de la liberación y el buen vivir andino</h2>${mapaCon(['Argentina','Bolivia','Peru','El Salvador'])}<div class="nota">Una psicología pensada desde acá: el grupo, la comunidad y el contexto social del sufrimiento.</div>${pie(4)}</div>`,
      `<div class="p claro"><div class="k">Y muchas más</div><div class="lista"><p><b>India y Tíbet</b>Yoga Sutras, lojong, bardo</p><p><b>Medio Oriente</b>Avicena, el sufismo, Maimónides, Hafez</p><p><b>Oceanía</b>Te Whare Tapa Whā, dadirri, kapwa</p><p><b>Europa</b>Wundt, Freud, Jung, Klein</p></div>${pie(5)}</div>`,
      `<div class="p bosque"><div style="color:#A3B18A">${ENSO}</div><div class="k" style="margin-top:40px">Mapa interactivo</div><h2>Tocá un país y descubrí sus psicologías: <em>link en la bio</em></h2><div class="txt" style="color:#D6D3C8">${web}/psicologias-del-mundo/</div><div class="txt" style="color:#D6D3C8;font-size:36px">Lic. Nicolás Raúl Bongiorno · Psicólogo clínico · ${cfg.matricula}<br>Alta Gracia y online</div>${pie(6, true)}</div>`,
    ],
    texto: `¿La psicología nació en Viena? No solo. Mucho antes de Freud, en la India, China, el mundo islámico, África y los pueblos de América ya se pensaba qué es la mente, por qué sufrimos y cómo se cambia.\n\nArmé un mapa interactivo: tocás un país y aparecen sus tradiciones, con su respaldo y sus límites, y los autores que nacieron ahí. Sin idealizar lo «exótico» y con respeto por las tradiciones vivas.\n\nEl mapa está en mi web (link en la bio): ${web}/psicologias-del-mundo/\n\n#Psicología #PsicologíaCultural #HistoriaDeLaPsicología #Jung #Psicólogo #AltaGracia #Córdoba #PsicólogoOnline`,
  },
  'linea-de-tiempo-de-la-psicologia': {
    url: '/linea-de-tiempo-de-la-psicologia/',
    placas: (pie) => [
      `<div class="p claro"><div class="k">Historia de la psicología</div><h1>De la filosofía a la inteligencia artificial</h1><div class="sub">2500 años de preguntas sobre la mente, en una línea de tiempo</div><div class="desliza">Deslizá →</div><div class="arco"><img src="data:image/webp;base64,${foto}"></div>${pie(1)}</div>`,
      `<div class="p papel"><div class="k">Antigüedad</div><div class="anio">c. 500 a. C.</div><h2>En la India, Grecia y China ya se preguntaban qué es el alma y por qué sufrimos</h2><div class="eje"><i class="on" style="left:8%"></i><i class="" style="left:62%"></i><i class="" style="left:70%"></i><i class="" style="left:80%"></i><i class="" style="left:96%"></i><span style="left:6%">Antigüedad</span><span style="left:94%">Hoy</span></div>${pie(2)}</div>`,
      `<div class="p claro"><div class="k">Nace la psicología</div><div class="anio">1879</div><h2>Wilhelm Wundt abre en Leipzig el primer laboratorio de psicología experimental</h2><div class="eje"><i class="" style="left:8%"></i><i class="on" style="left:62%"></i><i class="" style="left:70%"></i><i class="" style="left:80%"></i><i class="" style="left:96%"></i><span style="left:6%">Antigüedad</span><span style="left:94%">Hoy</span></div>${pie(3)}</div>`,
      `<div class="p papel"><div class="k">Las escuelas profundas</div><div class="anio">1907</div><h2>Jung conoce a Freud en Viena. Seis años después, sus caminos se separan</h2><div class="eje"><i class="" style="left:8%"></i><i class="" style="left:62%"></i><i class="on" style="left:70%"></i><i class="" style="left:80%"></i><i class="" style="left:96%"></i><span style="left:6%">Antigüedad</span><span style="left:94%">Hoy</span></div>${pie(4)}</div>`,
      `<div class="p claro"><div class="k">Argentina</div><div class="anio">1942</div><h2>Se funda la Asociación Psicoanalítica Argentina. En 1957 nace la carrera de Psicología en la UBA</h2><div class="eje"><i class="" style="left:8%"></i><i class="" style="left:62%"></i><i class="" style="left:70%"></i><i class="on" style="left:80%"></i><i class="" style="left:96%"></i><span style="left:6%">Antigüedad</span><span style="left:94%">Hoy</span></div>${pie(5)}</div>`,
      `<div class="p papel"><div class="k">Hoy</div><div class="anio">2025</div><h2>Primeros ensayos clínicos con chatbots de IA. Promesas, riesgos y una pregunta: ¿qué lugar queda para el vínculo?</h2><div class="eje"><i class="" style="left:8%"></i><i class="" style="left:62%"></i><i class="" style="left:70%"></i><i class="" style="left:80%"></i><i class="on" style="left:96%"></i><span style="left:6%">Antigüedad</span><span style="left:94%">Hoy</span></div>${pie(6)}</div>`,
      `<div class="p bosque"><div style="color:#A3B18A">${ENSO}</div><div class="k" style="margin-top:40px">Línea de tiempo interactiva</div><h2>98 hitos, de Buda a la IA: <em>link en la bio</em></h2><div class="txt" style="color:#D6D3C8">${web}/linea-de-tiempo-de-la-psicologia/</div><div class="txt" style="color:#D6D3C8;font-size:36px">Lic. Nicolás Raúl Bongiorno · Psicólogo clínico · ${cfg.matricula}<br>Alta Gracia y online</div>${pie(7, true)}</div>`,
    ],
    texto: `La psicología como ciencia tiene apenas 150 años, pero sus preguntas son tan viejas como la filosofía.\n\nArmé una línea de tiempo interactiva: de los Upanishads y Platón a Freud, Jung, la psicología argentina y la inteligencia artificial. Cada hito te lleva a un artículo, un laboratorio o un test para seguir explorando.\n\nEstá en mi web (link en la bio): ${web}/linea-de-tiempo-de-la-psicologia/\n\n#Psicología #HistoriaDeLaPsicología #Freud #Jung #SaludMental #Psicólogo #AltaGracia #Córdoba #PsicólogoOnline`,
  },
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [slug, d] of Object.entries(piezas)) {
    const out = path.join(raiz, 'redes/instagram', slug);
    fs.mkdirSync(out, { recursive: true });
    let N = 0; const contar = d.placas(() => ''); N = contar.length;
    const pie = (i, osc) => `<div class="pie"><span>${osc ? '' : '@psicologobongiorno'}</span><span class="n">${i} / ${N}</span></div>`;
    const placas = d.placas(pie);
    for (let i = 0; i < placas.length; i++) {
      await p.setContent(`<style>${css}</style>${placas[i]}`);
      await p.waitForTimeout(150);
      await p.screenshot({ path: path.join(out, String(i + 1).padStart(2, '0') + '.png') });
    }
    fs.writeFileSync(path.join(out, 'texto.txt'), d.texto);
    console.log(slug, placas.length, 'placas');
  }
  await b.close();
})();
