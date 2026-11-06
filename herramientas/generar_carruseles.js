/* Carruseles para Instagram (1080×1350) a partir de los artículos publicados.
   Salida: redes/instagram/<artículo>/01..05.png + texto.txt (pie de publicación).
   Uso: node herramientas/generar_carruseles.js  (requiere Playwright) */
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

function leer(txt) {
  const [cab, cuerpo] = txt.split('\n---\n');
  const m = {};
  cab.replace(/^---\n/, '').split('\n').forEach((l) => { const i = l.indexOf(':'); if (i > 0) m[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  const faq = [];
  const sec = cuerpo.split(/^## Preguntas frecuentes\s*$/m)[1];
  if (sec) sec.split(/^## /m)[0].split(/^### /m).slice(1).forEach((b) => { const [q, ...r] = b.trim().split('\n'); faq.push([q.trim(), r.join(' ').trim()]); });
  const intro = cuerpo.trim().split(/\n\n/)[0];
  return { m, faq, intro };
}

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

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const dir = path.join(raiz, 'contenido/blog');
  let total = 0;
  for (const archivo of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const { m, faq, intro } = leer(fs.readFileSync(path.join(dir, archivo), 'utf8'));
    if (m.estado !== 'publicado') continue;
    const slug = archivo.replace(/\.md$/, '');
    const out = path.join(raiz, 'redes/instagram', slug);
    fs.mkdirSync(out, { recursive: true });
    const [tit, ...resto] = m.titulo.split(':');
    const sub = resto.join(':').trim();
    const N = 5;
    const pie = (i, osc) => `<div class="pie"><span>${osc ? '' : '@psicologobongiorno'}</span><span class="n">${i} / ${N}</span></div>`;
    const placas = [
      `<div class="p claro"><div class="k">${esc(m.categoria)}</div><h1>${esc(tit)}</h1>${sub ? `<div class="sub">${esc(sub.charAt(0).toUpperCase() + sub.slice(1))}</div>` : ''}<div class="desliza">Deslizá →</div><div class="arco"><img src="data:image/webp;base64,${foto}"></div>${pie(1)}</div>`,
      `<div class="p papel"><div class="k">En pocas palabras</div><div class="caja"><div class="txt" style="margin:0">${md(m.respuesta || '')}</div></div>${pie(2)}</div>`,
      ...faq.slice(0, 2).map((f, i) => `<div class="p claro"><div class="k">Pregunta frecuente</div><h2>${esc(f[0])}</h2><div class="txt">${md(f[1])}</div>${pie(3 + i)}</div>`),
      `<div class="p bosque"><div style="color:#A3B18A">${ENSO}</div><div class="k" style="margin-top:40px">Para seguir leyendo</div><h2>El artículo completo está en mi web: <em>link en la bio</em></h2><div class="txt" style="color:#D6D3C8">${web}/recursos/${slug}/</div><div class="txt" style="color:#D6D3C8;font-size:36px">Lic. Nicolás Raúl Bongiorno · Psicólogo clínico · ${cfg.matricula}<br>Alta Gracia y online</div>${pie(5, true)}</div>`,
    ];
    for (let i = 0; i < placas.length; i++) {
      await p.setContent(`<style>${base}</style>${placas[i]}`);
      await p.waitForTimeout(120);
      await p.screenshot({ path: path.join(out, String(i + 1).padStart(2, '0') + '.png') });
    }
    const limpiar = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
    const etiquetas = {
      'Jung y psicología analítica': '#Jung #PsicologíaAnalítica #TerapiaJunguiana',
      'Ansiedad y emociones': '#Ansiedad #SaludEmocional #AtaquesDePánico',
      'Vínculos y relaciones': '#Vínculos #Relaciones #Pareja',
      'Salud mental': '#SaludMental #Terapia',
      'Psicología contemporánea': '#Psicoterapia #TerapiaOnline',
      'Desarrollo personal': '#Autoconocimiento #DesarrolloPersonal',
    }[m.categoria] || '';
    fs.writeFileSync(path.join(out, 'texto.txt'),
      `${limpiar(intro)}\n\n${limpiar(m.resumen)}\n\nEl artículo completo está en mi web (link en la bio): ${web}/recursos/${slug}/\n\n` +
      `Si querés conversarlo, escribime. Atiendo en Alta Gracia y online.\n\n${etiquetas} #Psicología #Psicólogo #AltaGracia #Córdoba #PsicólogoOnline`);
    total++;
  }
  console.log(total + ' carruseles generados en redes/instagram/');
  await b.close();
})();
