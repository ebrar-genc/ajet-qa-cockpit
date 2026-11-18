#!/usr/bin/env node
// Mark screenshots with red rectangles and save as PNG.
// Usage: node scripts/annotate.mjs <in.jpg> <out.png> x,y,w,h [x,y,w,h ...]
// Coordinates are in the source image's own pixel space.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'tools', 'noop.cjs'));
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const [input, output, ...rects] = process.argv.slice(2);
if (!input || !output || rects.length === 0) {
  console.error('usage: node scripts/annotate.mjs <in.jpg> <out.png> x,y,w,h ...');
  process.exit(1);
}

const BORDER = Number(process.env.ANNOTATE_BORDER || 8);
const RED = [237, 28, 36];

const bytes = fs.readFileSync(input);
const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
const raw = isPng ? PNG.sync.read(bytes) : jpeg.decode(bytes, { useTArray: true });
const { width, height, data } = raw;

const setPixel = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = (y * width + x) * 4;
  data[i] = RED[0];
  data[i + 1] = RED[1];
  data[i + 2] = RED[2];
  data[i + 3] = 255;
};

for (const r of rects) {
  const [x, y, w, h] = r.split(',').map(Number);
  if ([x, y, w, h].some((n) => !Number.isFinite(n))) {
    console.error(`bad rect: ${r}`);
    process.exit(1);
  }
  for (let t = 0; t < BORDER; t++) {
    for (let px = x; px < x + w; px++) {
      setPixel(px, y + t);
      setPixel(px, y + h - 1 - t);
    }
    for (let py = y; py < y + h; py++) {
      setPixel(x + t, py);
      setPixel(x + w - 1 - t, py);
    }
  }
}

const png = new PNG({ width, height });
data.copy ? data.copy(png.data) : png.data.set(data);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, PNG.sync.write(png));
console.log(`${path.basename(output)}  ${width}x${height}  ${rects.length} isaret`);
