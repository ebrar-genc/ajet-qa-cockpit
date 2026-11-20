// Evidence markup: draw red frames on a screenshot. Keeps the original resolution.
// Usage: node tools/mark.mjs <in.png|jpg> <out.png|jpg> <x1,y1,x2,y2> [more boxes...] [--blur x1,y1,x2,y2 ...]
// Box coords are in the input image's pixels. The frame is drawn OUTSIDE the box so it
// never covers the marked text. Frame is red (#E00000).
// Output: .png = lossless (preferred for screenshots), .jpg = quality 95.
// Rule (Ebrar, 2026-11-20): never downscale evidence. Text in the image must stay readable.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');

const argv = process.argv.slice(2);
if (argv.includes('--scale')) {
  console.error('--scale kaldirildi: kanit gorseli kucultulmez.');
  process.exit(1);
}
// --blur x1,y1,x2,y2 (repeatable): mask sensitive data (token, key, personal data) before framing.
const blurs = [];
for (let i = argv.indexOf('--blur'); i >= 0; i = argv.indexOf('--blur')) blurs.push(argv.splice(i, 2)[1]);
const [inp, out, ...boxes] = argv;
if (!inp || !out || (!boxes.length && !blurs.length)) {
  console.error('Kullanim: node tools/mark.mjs <in> <out.png|jpg> [x1,y1,x2,y2 ...] [--blur x1,y1,x2,y2 ...]');
  process.exit(1);
}
const buf = fs.readFileSync(inp);
const img = inp.toLowerCase().endsWith('.png') ? PNG.sync.read(buf) : jpeg.decode(buf, { useTArray: true });
const { width: W, height: H, data } = img;
const T = Math.max(4, Math.round(W / 320)); // ~6px on a 1920px screenshot
const put = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  data[i] = 224; data[i + 1] = 0; data[i + 2] = 0; data[i + 3] = 255;
};
// Mask: coarse pixel blocks (14px) + extra smear, so the text cannot be read back.
const B = 14;
for (const b of blurs) {
  const [x1, y1, x2, y2] = b.split(',').map(Number);
  for (let by = Math.max(0, y1); by <= Math.min(H - 1, y2); by += B) {
    for (let bx = Math.max(0, x1); bx <= Math.min(W - 1, x2); bx += B) {
      const ex = Math.min(bx + B - 1, x2, W - 1), ey = Math.min(by + B - 1, y2, H - 1);
      let r = 0, g = 0, bl = 0, n = 0;
      for (let y = by; y <= ey; y++) for (let x = bx; x <= ex; x++) { const i = (y * W + x) * 4; r += data[i]; g += data[i + 1]; bl += data[i + 2]; n++; }
      // pull every block toward mid grey so dark text on light background leaves no shape
      r = (r / n + 200) / 2; g = (g / n + 200) / 2; bl = (bl / n + 200) / 2;
      for (let y = by; y <= ey; y++) for (let x = bx; x <= ex; x++) { const i = (y * W + x) * 4; data[i] = r; data[i + 1] = g; data[i + 2] = bl; }
    }
  }
}
for (const b of boxes) {
  let [x1, y1, x2, y2] = b.split(',').map(Number);
  x1 -= T + 2; y1 -= T + 2; x2 += T + 2; y2 += T + 2; // gap so the frame does not touch text
  for (let t = 0; t < T; t++) {
    for (let x = x1; x <= x2; x++) { put(x, y1 + t); put(x, y2 - t); }
    for (let y = y1; y <= y2; y++) { put(x1 + t, y); put(x2 - t, y); }
  }
}
if (out.toLowerCase().endsWith('.png')) {
  const png = new PNG({ width: W, height: H });
  data.copy ? data.copy(png.data) : png.data.set(data);
  fs.writeFileSync(out, PNG.sync.write(png));
} else {
  fs.writeFileSync(out, jpeg.encode({ data, width: W, height: H }, 95).data);
}
console.log(`${out}  ${W}x${H}`);
