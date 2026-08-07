/**
 * sivispharma.com'dan logo + ürün görsellerini indirir.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outBrand = path.join(root, "public/images/brand");
const outProducts = path.join(root, "public/images/products");
const tmp = path.join(root, ".tmp-sivis");

fs.mkdirSync(outBrand, { recursive: true });
fs.mkdirSync(outProducts, { recursive: true });
fs.mkdirSync(tmp, { recursive: true });

function curl(url, dest) {
  const r = spawnSync(
    "curl.exe",
    ["-sL", "-A", "Mozilla/5.0", "-o", dest, url],
    { windowsHide: true, maxBuffer: 40 * 1024 * 1024 },
  );
  if (r.status !== 0) throw new Error(`curl fail ${url}`);
  const st = fs.statSync(dest);
  if (st.size < 200) throw new Error(`too small ${url} (${st.size})`);
  return st.size;
}

function curlText(url) {
  const dest = path.join(tmp, `page-${Date.now()}-${Math.random().toString(16).slice(2)}.html`);
  curl(url, dest);
  return fs.readFileSync(dest, "utf8");
}

function absUrl(u) {
  if (!u) return null;
  if (u.startsWith("//")) return `https:${u}`;
  if (u.startsWith("/")) return `https://www.sivispharma.com${u}`;
  if (u.startsWith("http")) return u;
  return null;
}

function extractUrls(html) {
  const urls = new Set();
  const patterns = [
    /(?:src|href)=["']([^"']+\.(?:png|jpe?g|webp|svg|gif|avif)(?:\?[^"']*)?)["']/gi,
    /url\((["']?)([^)"']+\.(?:png|jpe?g|webp|svg|gif|avif)(?:\?[^"']*)?)\1\)/gi,
    /"(https?:\/\/[^"]+\.(?:png|jpe?g|webp|svg|gif|avif)(?:\?[^"]*)?)"/gi,
    /"(\/_next\/image\?[^"]+)"/gi,
    /"(\/images\/[^"]+)"/gi,
    /"(\/uploads\/[^"]+)"/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const raw = m[2] || m[1];
      const u = absUrl(raw);
      if (u) urls.add(u);
    }
  }
  return [...urls];
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function extOf(url) {
  try {
    const p = new URL(url).pathname;
    const e = path.extname(p).toLowerCase();
    if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif"].includes(e)) return e;
  } catch {
    /* ignore */
  }
  if (url.includes("svg")) return ".svg";
  if (url.includes("webp")) return ".webp";
  return ".jpg";
}

const seeds = [
  "https://www.sivispharma.com/",
  "https://www.sivispharma.com/urunler",
  "https://www.sivispharma.com/products",
  "https://www.sivispharma.com/kategoriler",
];

const productSlugsGuess = [
  "sivisfol",
  "sivis-omefol",
  "sivislact",
  "sivis-leydinol",
  "sivis-virinol",
  "sivishot-performans-woman",
  "sivishot-performans-man",
  "sivistone",
  "sivis-procystin",
  "sivisfer-plus",
  "sivis-cama-duo",
  "sivis-fol",
  "omefol",
  "leydinol",
  "virinol",
  "procystin",
];

for (const s of productSlugsGuess) {
  seeds.push(`https://www.sivispharma.com/urun/${s}`);
  seeds.push(`https://www.sivispharma.com/product/${s}`);
  seeds.push(`https://www.sivispharma.com/products/${s}`);
}

let all = new Set();
let homeHtml = "";

for (const seed of seeds) {
  try {
    const html = curlText(seed);
    if (seed.endsWith(".com/") || seed.endsWith(".com")) homeHtml = html;
    const found = extractUrls(html);
    console.log(`${seed} → ${found.length} urls`);
    found.forEach((u) => all.add(u));

    // Next.js chunks may contain image paths
    const chunks = [...html.matchAll(/\/_next\/static\/[^"']+\.js/g)].map((m) => m[0]);
    for (const c of [...new Set(chunks)].slice(0, 12)) {
      try {
        const js = curlText(`https://www.sivispharma.com${c}`);
        extractUrls(js).forEach((u) => all.add(u));
        // also bare /images paths in JS
        for (const m of js.matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)) {
          const u = absUrl(m[1]);
          if (u) all.add(u);
        }
        for (const m of js.matchAll(/["'`]([^"'`]+\.(?:png|jpe?g|webp|svg))["'`]/g)) {
          const u = absUrl(m[1]);
          if (u && /sivispharma|\/images\/|\/_next\//i.test(u)) all.add(u);
        }
      } catch {
        /* ignore */
      }
    }
  } catch (e) {
    console.warn(`skip ${seed}: ${e.message}`);
  }
}

// Also parse RSC payload strings from home
if (!homeHtml) {
  try {
    homeHtml = curlText("https://www.sivispharma.com/");
  } catch {
    /* ignore */
  }
}

all = [...all];
console.log(`\nTotal unique asset URLs: ${all.length}`);
all.forEach((u) => console.log(" ", u));

const manifest = { logo: null, images: [], downloaded: [] };

for (const url of all) {
  const lower = url.toLowerCase();
  const isLogo = /logo|favicon|brand|marka/i.test(lower);
  const isIcon = /favicon|icon-|apple-touch|manifest/i.test(lower) && !/logo/i.test(lower);
  if (isIcon && !isLogo) continue;

  const base = slugify(path.basename(new URL(url.split("?")[0]).pathname) || "asset") || "asset";
  const ext = extOf(url);
  const destDir = isLogo ? outBrand : outProducts;
  let filename = `${base}${ext}`;
  let dest = path.join(destDir, filename);
  let i = 1;
  while (fs.existsSync(dest)) {
    filename = `${base}-${i}${ext}`;
    dest = path.join(destDir, filename);
    i += 1;
  }

  try {
    const bytes = curl(url, dest);
    const rel = `/images/${isLogo ? "brand" : "products"}/${filename}`;
    console.log(`OK ${(bytes / 1024).toFixed(1)}KB → ${rel}`);
    manifest.downloaded.push({ url, local: rel, bytes, logo: isLogo });
    if (isLogo && !manifest.logo) manifest.logo = rel;
    if (!isLogo) manifest.images.push(rel);
  } catch (e) {
    console.warn(`FAIL ${url}: ${e.message}`);
  }
}

// Prefer svg logo if multiple
const logos = manifest.downloaded.filter((d) => d.logo);
const svgLogo = logos.find((d) => d.local.endsWith(".svg"));
if (svgLogo) manifest.logo = svgLogo.local;

fs.writeFileSync(path.join(outBrand, "manifest.json"), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(root, "public/images/manifest.json"), JSON.stringify(manifest, null, 2));
console.log("\nLogo:", manifest.logo);
console.log("Product images:", manifest.images.length);
