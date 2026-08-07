import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/styles.css");
let c = fs.readFileSync(p, "utf8");

const old = `.product-tile__media,
.product-card__banner {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, #fff 0%, #eef3f1 55%, #dfeae6 100%);
}

.product-tile__media .photo-banner,
.product-card__banner .photo-banner {
  position: absolute;
  inset: 0;
}

.product-tile__media .photo-banner__img,
.product-card__banner .photo-banner__img {
  object-fit: contain;
  object-position: center;
  padding: 1.1rem 1.25rem;
  transition: transform 0.7s var(--ease);
}

.product-tile:hover .photo-banner__img,
.product-card-link:hover .photo-banner__img {
  transform: scale(1.04);
  animation: none;
}`;

const neu = `.product-tile__media,
.product-card__banner {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 42%, #2a2a2a 0%, #141414 55%, #0c0c0c 100%);
}

.product-tile__media .photo-card,
.product-card__banner .photo-card {
  position: absolute;
  inset: 0;
  background: transparent;
}

.product-tile:hover .packshot__img,
.product-card-link:hover .packshot__img {
  transform: translateY(-4px) scale(1.03);
  animation: none;
}`;

if (!c.includes(old)) {
  console.error("OLD BLOCK NOT FOUND");
  process.exit(1);
}
c = c.replace(old, neu);
fs.writeFileSync(p, c);
console.log("patched");
