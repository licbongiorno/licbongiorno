// Genera contenido/mapa-mundi.svg (mapa de "Psicologías del mundo") a partir de Natural Earth
// (world-atlas, dominio público) y de contenido/mapa-mundi.json.
// Uso: npm i d3-geo@3 topojson-client@3 world-atlas@2 (en cualquier carpeta) y
//      NODE_PATH=<esa carpeta>/node_modules node herramientas/generar_mapa_mundi.js
const fs = require("fs"), path = require("path");
const { geoEqualEarth, geoPath } = require("d3-geo");
const { feature } = require("topojson-client");
const topo = require("world-atlas/countries-110m.json");
const raiz = path.join(__dirname, "..");
const datos = JSON.parse(fs.readFileSync(path.join(raiz, "contenido/mapa-mundi.json"), "utf8"));
const W = 1000, H = 500;
const paises = feature(topo, topo.objects.countries).features.filter(f => f.properties.name !== "Antarctica" && f.properties.name !== "Fr. S. Antarctic Lands");
const proy = geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], { type: "FeatureCollection", features: paises });
const ruta = geoPath(proy).digits(1);
const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
let base = "", activos = "";
for (const f of paises) {
  const d = ruta(f); if (!d) continue;
  const p = datos.paises[f.properties.name];
  if (p) activos += `<path class="mm-pais mm-activo" d="${d}" data-pais="${esc(f.properties.name)}" tabindex="0" role="button" aria-label="${esc(p[0])}"><title>${esc(p[0])}</title></path>`;
  else base += `<path class="mm-pais" d="${d}"/>`;
}
let marcas = "";
datos.marcas.forEach((m, i) => {
  const [x, y] = proy([m.lon, m.lat]);
  marcas += `<circle class="mm-marca" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" data-marca="${i}" tabindex="0" role="button" aria-label="${esc(m.nombre)}"><title>${esc(m.nombre)}</title></circle>`;
});
const svg = `<svg class="mm-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Mapa del mundo: elegí un país">` +
  `<g class="mm-base">${base}</g><g class="mm-activos">${activos}</g><g class="mm-marcas">${marcas}</g></svg>`;
fs.writeFileSync(path.join(raiz, "contenido/mapa-mundi.svg"), svg);
console.log("mapa-mundi.svg", (svg.length / 1024).toFixed(0), "KB");
