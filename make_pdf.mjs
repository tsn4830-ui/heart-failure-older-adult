import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Canvas, Image } from "skia-canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : __dirname;
const imageDir = path.join(base, "origin_image");
const out = path.join(base, "heart-failure-older-adult.pdf");
const files = (await fs.readdir(imageDir))
  .filter((name) => /^slide_\d+\.png$/.test(name))
  .sort()
  .map((name) => path.join(imageDir, name));

if (!files.length) {
  throw new Error(`No slide PNG files found in ${imageDir}`);
}

const canvas = new Canvas(1280, 720);
let ctx = canvas.getContext("2d");

for (const [index, file] of files.entries()) {
  if (index > 0) ctx = canvas.newPage();
  const image = new Image();
  image.src = await fs.readFile(file);
  ctx.drawImage(image, 0, 0, 1280, 720);
}

await canvas.saveAs(out);
console.log(`${out} (${files.length} pages)`);
