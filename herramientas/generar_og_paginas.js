/* Genera una imagen para compartir (1200×630) por página: assets/img/og/pagina-<ruta>.jpg
   Uso: node herramientas/generar_og_paginas.js  (requiere Playwright). Después: python3 build.py */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(raiz, 'sitio.json'), 'utf8'));
const f64 = (n) => fs.readFileSync(path.join(raiz, 'assets/fonts', n)).toString('base64');
const fotos = ['foto', 'foto_sobre_mi', 'foto_lectura', 'foto_biblioteca'].filter((k) => cfg[k]).map((k) => fs.readFileSync(path.join(raiz, cfg[k])).toString('base64'));
const omitir = ['/', '/404.html', '/privacidad/'];

(async () => {
  fs.mkdirSync(path.join(raiz, 'assets/img/og'), { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const dir = path.join(raiz, 'contenido/paginas');
  let n = 0;
  for (const archivo of fs.readdirSync(dir).filter((x) => x.endsWith('.html')).sort()) {
    const txt = fs.readFileSync(path.join(dir, archivo), 'utf8');
    const meta = JSON.parse(txt.match(/<!--(\{[\s\S]*?\})-->/)[1]);
    if (omitir.includes(meta.ruta) || !meta.h1) continue;
    const h1 = meta.h1.replace(/<(?!\/?em>)[^>]+>/g, '');
    const plano = h1.replace(/<[^>]+>/g, '');
    const foto = fotos[n++ % fotos.length];
    const html = `<style>
      @font-face{font-family:PF;src:url(data:font/woff2;base64,${f64('playfair-display-normal.woff2')})}
      @font-face{font-family:PF;font-style:italic;src:url(data:font/woff2;base64,${f64('playfair-display-italic.woff2')})}
      @font-face{font-family:MS;src:url(data:font/woff2;base64,${f64('montserrat-normal.woff2')})}
      body{margin:0;width:1200px;height:630px;background:#F6F1EB;position:relative;overflow:hidden}
      .t{position:absolute;left:80px;top:80px;width:640px;height:470px;display:flex;flex-direction:column}
      .k{font-family:MS;font-size:17px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#4A5A3C}
      h1{font-family:PF;font-weight:400;font-size:${plano.length > 40 ? 54 : 64}px;line-height:1.08;color:#26241F;margin:26px 0 0;letter-spacing:-1px}
      h1 em{color:#4A5A3C}
      .pie{margin-top:auto;font-family:MS;font-size:18px;color:#4D493F}
      .pie b{font-family:PF;font-weight:400;font-size:26px;color:#26241F;display:block;margin-bottom:6px}
      .arco{position:absolute;right:80px;top:70px;width:340px;height:490px;border-radius:170px 170px 26px 26px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(38,36,31,.4)}
      .arco img{width:100%;height:100%;object-fit:cover;object-position:50% 22%}
    </style>
    <div class="t"><div class="k">${meta.antetitulo || 'Psicólogo clínico'}</div><h1>${h1}</h1>
    <div class="pie"><b>Lic. Nicolás Bongiorno</b>Psicólogo clínico · M.P. 8209 · Alta Gracia y online</div></div>
    <div class="arco"><img src="data:image/webp;base64,${foto}"></div>`;
    await p.setContent(html);
    await p.waitForTimeout(200);
    const nombre = 'pagina-' + meta.ruta.replace(/^\/|\/$/g, '').replace(/\//g, '-') + '.jpg';
    await p.screenshot({ path: path.join(raiz, 'assets/img/og', nombre), type: 'jpeg', quality: 82 });
  }
  console.log(n + ' imágenes de páginas generadas');
  await b.close();
})();
