/* Genera una imagen para compartir (1200×630) por artículo: assets/img/og/<artículo>.jpg
   Uso (desde la carpeta del proyecto): node herramientas/generar_og_articulos.js
   Requiere Playwright. Después, correr python3 build.py (la usa automáticamente si existe). */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(raiz, 'sitio.json'), 'utf8'));
const f64 = (n) => fs.readFileSync(path.join(raiz, 'assets/fonts', n)).toString('base64');
const foto = cfg.foto_lectura || cfg.foto;
const foto64 = fs.readFileSync(path.join(raiz, foto)).toString('base64');
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function leer(md) {
  const [cab] = md.split('\n---\n');
  const meta = {};
  cab.replace(/^---\n/, '').split('\n').forEach((l) => { const i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  return meta;
}

(async () => {
  fs.mkdirSync(path.join(raiz, 'assets/img/og'), { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const dir = path.join(raiz, 'contenido/blog');
  for (const archivo of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const m = leer(fs.readFileSync(path.join(dir, archivo), 'utf8'));
    const [titulo, ...resto] = m.titulo.split(':');
    const sub = resto.join(':').trim();
    const html = `<style>
      @font-face{font-family:PF;src:url(data:font/woff2;base64,${f64('playfair-display-normal.woff2')})}
      @font-face{font-family:MS;src:url(data:font/woff2;base64,${f64('montserrat-normal.woff2')})}
      body{margin:0;width:1200px;height:630px;background:#F6F1EB;position:relative;overflow:hidden}
      .t{position:absolute;left:80px;top:80px;width:640px;height:470px;display:flex;flex-direction:column}
      .k{font-family:MS;font-size:17px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#4A5A3C}
      h1{font-family:PF;font-weight:400;font-size:${titulo.length > 42 ? 56 : 66}px;line-height:1.06;color:#26241F;margin:26px 0 0;letter-spacing:-1px}
      @font-face{font-family:PFI;src:url(data:font/woff2;base64,${f64('playfair-display-italic.woff2')})}
      .sub{font-family:PFI;font-size:30px;line-height:1.25;color:#4A5A3C;margin-top:22px}
      .pie{margin-top:auto;font-family:MS;font-size:18px;color:#4D493F}
      .pie b{font-family:PF;font-weight:400;font-size:26px;color:#26241F;display:block;margin-bottom:6px}
      .arco{position:absolute;right:80px;top:70px;width:340px;height:490px;border-radius:170px 170px 26px 26px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(38,36,31,.4)}
      .arco img{width:100%;height:100%;object-fit:cover;object-position:50% 25%}
      .sello{position:absolute;right:62px;bottom:46px;width:46px;height:46px;border-radius:50%;background:#F4A261}
    </style>
    <div class="t"><div class="k">${esc(m.categoria)}</div><h1>${esc(titulo)}</h1>${sub ? `<div class="sub">${esc(sub.charAt(0).toUpperCase() + sub.slice(1))}</div>` : ''}
    <div class="pie"><b>Lic. Nicolás Bongiorno</b>Psicólogo clínico · M.P. 8209</div></div>
    <div class="arco"><img src="data:image/webp;base64,${foto64}"></div>`;
    await p.setContent(html);
    await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(raiz, 'assets/img/og', archivo.replace(/\.md$/, '.jpg')), type: 'jpeg', quality: 84 });
    console.log('og:', archivo);
  }
  await b.close();
})();
