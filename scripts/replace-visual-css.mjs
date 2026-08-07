import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const cssPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/styles.css");
let css = fs.readFileSync(cssPath, "utf8");

const start = css.indexOf("/* ========== Premium packshot");
const endMarker = ".hero__content,\n.page-banner__content,";
const end = css.indexOf(endMarker);
if (start < 0 || end < 0) {
  console.error("markers not found", { start, end });
  process.exit(1);
}

const replacement = `/* ========== Clean studio product surfaces ========== */
.shot {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.shot__img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.55s var(--ease);
}

.shot-show {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  overflow: hidden;
}

.shot-show--panel {
  background:
    radial-gradient(circle at 50% 40%, #ffffff 0%, #f5f5f5 55%, #ebebeb 100%);
}

.shot-show__slide {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  opacity: 0;
  transition: opacity 0.8s var(--ease);
}

.shot-show__slide.is-active {
  opacity: 1;
  z-index: 1;
}

.shot-show__img {
  width: min(100%, 520px);
  height: auto;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.12));
}

.shot-show__dots {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.shot-show__dots button {
  width: 0.4rem;
  height: 0.4rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.22);
  cursor: pointer;
  transition: width 0.25s, background 0.25s;
}

.shot-show__dots button.is-active {
  width: 1.2rem;
  background: var(--red);
}

/* Hero — dark copy + light product tray */
.hero-clean {
  position: relative;
  min-height: 100svh;
  min-height: 100dvh;
  display: grid;
  align-items: center;
  background:
    radial-gradient(900px 500px at 85% 20%, rgba(200, 16, 46, 0.16), transparent 55%),
    #0f0f0f;
  color: #f7f7f7;
  overflow: hidden;
}

.hero-clean__inner {
  width: min(1180px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: calc(var(--nav-h) + 2.5rem) 0 3rem;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(1.75rem, 4vw, 3.5rem);
  align-items: center;
}

.eyebrow--on-dark {
  color: rgba(255, 255, 255, 0.55);
}

.hero-clean__brand {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6.5vw, 4.6rem);
  letter-spacing: -0.03em;
  line-height: 0.95;
}

.hero-clean__title {
  margin: 1rem 0 0;
  max-width: 16ch;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.15rem);
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
}

.hero-clean__title em {
  font-style: italic;
  color: #ff5a6e;
}

.hero-clean__sub {
  margin: 1rem 0 0;
  max-width: 30rem;
  color: rgba(255, 255, 255, 0.68);
  font-size: 1.05rem;
}

.hero-clean__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero-clean__visual {
  display: grid;
  gap: 0.9rem;
  justify-items: center;
}

.hero-clean__tray {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: min(62vh, 560px);
  border-radius: 1.6rem;
  background:
    radial-gradient(circle at 50% 38%, #ffffff 0%, #f4f4f4 50%, #e8e8e8 100%);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  overflow: hidden;
}

.hero-clean__product {
  position: absolute;
  inset: 8%;
  width: 84%;
  height: 84%;
  margin: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.75s var(--ease);
}

.hero-clean__product.is-active {
  opacity: 1;
}

.hero-clean__dots {
  display: flex;
  gap: 0.4rem;
}

.hero-clean__dots span {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
}

.hero-clean__dots span.is-active {
  width: 1.2rem;
  background: #fff;
}

/* Split — equal clean panels */
.split--clean {
  grid-template-columns: 1.1fr 1fr;
  min-height: 0;
  background: #fff;
}

.split--clean .split__media {
  position: relative;
  min-height: 520px;
  background: #f3f3f3;
}

.split--clean .split__copy {
  background: #fff;
  padding: clamp(2.5rem, 5vw, 4.5rem);
  min-width: 0;
  overflow-wrap: anywhere;
}

.split--clean .section-title,
.split--clean .section-sub {
  max-width: 100%;
}

/* Export CTA band */
.cta-band {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 480px;
  background: #fff;
  border-top: 1px solid var(--line);
}

.cta-band__visual {
  position: relative;
  min-height: 360px;
  background: #f3f3f3;
}

.cta-band__copy {
  display: grid;
  align-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  min-width: 0;
}

.cta-band__copy .section-sub {
  margin-bottom: 1.25rem;
}

`;

css = css.slice(0, start) + replacement + css.slice(end);
fs.writeFileSync(cssPath, css);
console.log("visual block replaced");
