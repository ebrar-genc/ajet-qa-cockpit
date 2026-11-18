// Usage: node .tools/pdftext.mjs <file.pdf>
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const doc = await getDocument({ url: process.argv[2], useSystemFonts: true }).promise;
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const tc = await page.getTextContent();
  let line = '', lastY = null, out = [];
  for (const it of tc.items) {
    const y = Math.round(it.transform[5]);
    if (lastY !== null && Math.abs(y - lastY) > 2) { out.push(line.trim()); line = ''; }
    line += it.str + (it.hasEOL ? '\n' : ' ');
    lastY = y;
  }
  out.push(line.trim());
  console.log(`===== SAYFA ${p} =====`);
  console.log(out.filter(Boolean).join('\n'));
}
