/* Genera favicon PNG/ICO, íconos de la app e imagen para redes (og-inicio.jpg).
   Uso (desde sitio-bongiorno/):  node herramientas/generar_imagenes.js
   Requiere Playwright (npm i playwright) y Python con Pillow para el .ico.
   La ilustración se toma de ARTE_HERO en build.py, así redes y web comparten la misma imagen. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const base = path.resolve(__dirname, '../assets');
function arteSVG() {
  const src = fs.readFileSync(path.resolve(__dirname, '../build.py'), 'utf8');
  return src.match(/ARTE_HERO = '''([\s\S]*?)'''/)[1]
    .replace('class="umbral__arte"', 'width="420" height="520"')
    .replace('class="onda"', 'opacity=".7"').replace('class="onda onda--2"', 'opacity=".4" transform="translate(200 404) scale(.7) translate(-200 -404)"')
    .replace('class="onda onda--3"', 'opacity="0"').replace('<g class="flota">', '<g>');
}
function arteOFoto() {
  const cfg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../sitio.json'), 'utf8'));
  if (cfg.foto) {
    const b64 = fs.readFileSync(path.resolve(__dirname, '..', cfg.foto)).toString('base64');
    return `<img src="data:image/webp;base64,${b64}" style="width:100%;height:100%;object-fit:cover;object-position:50% 20%">`;
  }
  return arteSVG();
}
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const fav = fs.readFileSync(base + '/img/favicon.svg', 'utf8');
  for (const s of [180, 192, 512, 32]) {
    await p.setViewportSize({ width: s, height: s });
    await p.setContent(`<style>html,body{margin:0}svg{width:${s}px;height:${s}px;display:block}</style>${fav}`);
    await p.screenshot({ path: `${base}/img/${s===180?'apple-touch-icon':s===32?'fav32':'simbolo-'+s}.png`, omitBackground: true });
  }
  const css = (f) => `@font-face{font-family:'${f[0]}';src:url(data:font/woff2;base64,${fs.readFileSync(base+'/fonts/'+f[1]).toString('base64')})}`;
  await p.setViewportSize({ width: 1200, height: 630 });
  const html = `<style>${css(['PF','playfair-display-normal.woff2'])}${css(['PFI','playfair-display-italic.woff2'])}${css(['MS','montserrat-normal.woff2'])}
  body{margin:0;width:1200px;height:630px;background:#F6F1EB;position:relative;overflow:hidden;font-family:MS}
  .arte{position:absolute;right:70px;top:55px;width:420px;height:520px;border-radius:210px 210px 28px 28px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(38,36,31,.35)}
  .t{position:absolute;left:80px;top:96px;width:620px}
  .k{font-size:17px;letter-spacing:.16em;text-transform:uppercase;color:#4A5A3C;font-weight:600}
  h1{font-family:PF;font-weight:400;font-size:74px;line-height:1.03;color:#26241F;margin:28px 0 30px;letter-spacing:-1.5px}
  h1 em{font-family:PFI;font-style:normal;color:#4A5A3C}
  .n{font-family:PF;font-size:30px;color:#26241F}.r{font-size:17px;color:#4D493F;margin-top:10px;letter-spacing:.04em}
  .l{position:absolute;left:80px;bottom:70px;display:flex;gap:14px;align-items:center}
  </style><div class="t"><div class="k">Psicólogo clínico · M.P. 8209</div><h1>Lo que te habita<br>también merece<br><em>ser escuchado.</em></h1>
  <div class="n">Lic. Nicolás Raúl Bongiorno</div><div class="r">Alta Gracia, Córdoba · Terapia online en español</div></div>
  <div class="arte">${arteOFoto()}</div>`;
  await p.setContent(html); await p.waitForTimeout(500);
  await p.screenshot({ path: base + '/img/og-inicio.jpg', type: 'jpeg', quality: 86 });
  await b.close();
  require('child_process').execSync(`python3 -c "from PIL import Image; Image.open('${base}/img/fav32.png').save('${base}/img/favicon.ico', sizes=[(32,32)])"`);
  fs.unlinkSync(base + '/img/fav32.png');
  console.log('Imágenes generadas en assets/img/');
})();
