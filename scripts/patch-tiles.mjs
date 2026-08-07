import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/styles.css");
let c = fs.readFileSync(p, "utf8");

const replacements = [
  [
    `.product-tile__media,
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
}`,
    `.product-tile__media,
.product-card__banner {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 40%, #ffffff 0%, #f5f5f5 55%, #ebebeb 100%);
}

.product-tile__media .shot,
.product-card__banner .shot {
  position: absolute;
  inset: 0;
}

.product-tile:hover .shot__img,
.product-card-link:hover .shot__img {
  transform: scale(1.04);
}`,
  ],
  [
    `.profile__shot {
  position: sticky;
  top: calc(var(--nav-h) + 1rem);
  border-radius: 1.5rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 42%, #222 0%, #121212 55%, #0a0a0a 100%);
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  min-height: 360px;
}

.profile__shot .packshot--profile {
  width: min(100%, 400px);
}

.profile__img {
  /* sizing handled by .packshot__img */
  padding: 0 !important;
  aspect-ratio: auto !important;
}`,
    `.profile__shot {
  position: sticky;
  top: calc(var(--nav-h) + 1rem);
  border-radius: 1.5rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 40%, #ffffff 0%, #f5f5f5 55%, #ebebeb 100%);
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  padding: 1.75rem;
  min-height: 360px;
}

.profile__img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
}`,
  ],
  [
    `  .hero-pro__grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: calc(var(--nav-h) + 1.5rem) 0 2.5rem;
  }

  .hero-pro__stage {
    order: -1;
    min-height: 46vh;
  }

  .hero-pro__brand {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
  }

  .hero-pro__title {
    font-size: clamp(1.35rem, 5.5vw, 1.75rem);
  }

  .hero-pro__actions {
    flex-direction: column;
    align-items: stretch;
    max-width: 22rem;
  }

  .hero-pro__actions .btn {
    width: 100%;
  }

  .packshot--hero {
    width: min(92%, 360px);
  }`,
    `  .hero-clean__inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: calc(var(--nav-h) + 1.5rem) 0 2.5rem;
  }

  .hero-clean__visual {
    order: -1;
  }

  .hero-clean__tray {
    max-height: 48vh;
  }

  .hero-clean__brand {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
  }

  .hero-clean__title {
    font-size: clamp(1.35rem, 5.5vw, 1.75rem);
  }

  .hero-clean__actions {
    flex-direction: column;
    align-items: stretch;
    max-width: 22rem;
  }

  .hero-clean__actions .btn {
    width: 100%;
  }

  .split--clean,
  .cta-band {
    grid-template-columns: 1fr;
  }

  .split--clean .split__media,
  .cta-band__visual {
    min-height: 280px;
  }`,
  ],
];

for (const [a, b] of replacements) {
  if (!c.includes(a)) {
    console.error("MISSING BLOCK:\n", a.slice(0, 80));
    process.exit(1);
  }
  c = c.replace(a, b);
}

// Soften category badge on light media
c = c.replace(
  `.product-card__banner span {
  position: absolute;
  z-index: 2;
  left: 1rem;
  bottom: 1rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  color: #fff !important;
  background: var(--red) !important;
}`,
  `.product-card__banner span {
  position: absolute;
  z-index: 2;
  left: 1rem;
  bottom: 1rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  color: #fff !important;
  background: var(--ink) !important;
}`,
);

fs.writeFileSync(p, c);
console.log("tiles/profile/mobile patched");
