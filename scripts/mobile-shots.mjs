import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, ".tmp-mobile");
fs.mkdirSync(out, { recursive: true });

const base = process.env.SHOT_URL || "http://127.0.0.1:5175";
const pages = [
  ["home", "/"],
  ["products", "/#/urunler"],
  ["profile", "/#/urun/sivisfol"],
  ["contact", "/#/iletisim"],
];

const viewports = [
  { name: "iphone", width: 390, height: 844 },
  { name: "small", width: 360, height: 740 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  for (const [label, route] of pages) {
    const url = `${base}${route === "/" ? "/#/" : route}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
    await page.waitForTimeout(200);
    const file = path.join(out, `${vp.name}-${label}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("shot", file);
  }
  await context.close();
}
await browser.close();
console.log("done");
