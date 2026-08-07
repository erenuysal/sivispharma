import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/images/products");
const brand = path.join(root, "public/images/brand");
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(brand, { recursive: true });

function curl(url, dest) {
  const r = spawnSync("curl.exe", ["-sL", "-A", "Mozilla/5.0", "-o", dest, url], {
    windowsHide: true,
  });
  if (r.status !== 0) return false;
  return fs.existsSync(dest) && fs.statSync(dest).size > 1000;
}

const candidates = [
  "sivisfol.jpg",
  "omefol.jpg",
  "sivislact.jpg",
  "leydinol.jpg",
  "virinol.jpg",
  "stone.jpg",
  "procystin.jpg",
  "sivisfer.jpg",
  "cama-duo.jpg",
  "sivishot-woman.jpg",
  "sivishot-man.jpg",
  "shot-woman.jpg",
  "shot-man.jpg",
  "sivishot.jpg",
  "performans-woman.jpg",
  "performans-man.jpg",
  "woman.jpg",
  "man.jpg",
  "hero.jpg",
  "hero.webp",
  "banner.jpg",
  "about.jpg",
  "export.jpg",
];

const brandFiles = ["logo.svg", "logo.png", "logo.webp", "favicon.ico"];

for (const f of brandFiles) {
  const dest = path.join(brand, f);
  const ok = curl(`https://www.sivispharma.com/images/${f}`, dest) ||
    curl(`https://www.sivispharma.com/images/logo.svg`, path.join(brand, "logo.svg"));
  if (ok) console.log("brand", f, fs.statSync(dest).size);
}

// clean messy names from previous run - redownload clean
for (const f of candidates) {
  const dest = path.join(out, f);
  const urls = [
    `https://www.sivispharma.com/images/products/${f}`,
    `https://www.sivispharma.com/images/${f}`,
  ];
  let ok = false;
  for (const u of urls) {
    if (curl(u, dest)) {
      console.log("OK", f, fs.statSync(dest).size);
      ok = true;
      break;
    }
  }
  if (!ok && fs.existsSync(dest) && fs.statSync(dest).size < 1000) fs.unlinkSync(dest);
}

// parse home for any /images/products/*.jpg
const home = path.join(root, ".tmp-home.html");
curl("https://www.sivispharma.com/", home);
const html = fs.readFileSync(home, "utf8");
const names = [...html.matchAll(/\/images\/products\/([a-z0-9\-]+\.(?:jpg|jpeg|png|webp))/gi)].map(
  (m) => m[1].toLowerCase(),
);
console.log("found in html", [...new Set(names)]);
for (const f of new Set(names)) {
  const dest = path.join(out, f);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
    if (curl(`https://www.sivispharma.com/images/products/${f}`, dest)) {
      console.log("OK extra", f, fs.statSync(dest).size);
    }
  }
}

console.log("\nLocal files:");
for (const f of fs.readdirSync(out)) console.log(" ", f, fs.statSync(path.join(out, f)).size);
for (const f of fs.readdirSync(brand)) console.log(" brand", f, fs.statSync(path.join(brand, f)).size);
