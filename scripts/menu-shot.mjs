import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, ".tmp-mobile");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:5175/#/", { waitUntil: "networkidle" });
await page.click(".nav__burger");
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "menu-open.png") });
console.log("saved menu-open.png");
await browser.close();
