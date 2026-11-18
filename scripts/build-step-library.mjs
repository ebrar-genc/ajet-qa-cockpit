#!/usr/bin/env node
// Extract a canonical Gherkin step catalog from Xray.
//
// Only reads tests in status `Automated` (and optionally `Automation Review`):
// those scenarios demonstrably run, so their steps are guaranteed to have a
// matching Java step definition. Steps harvested from Backlog/Waiting-For-BDD
// tests would be aspirational, not real — exactly the trap this file avoids.
//
//   node scripts/build-step-library.mjs [--max 2000] [--status Automated]
//                                       [--channel "WEB-Desktop,Mobil-Android"] [--out docs/step-library.md]
//
// UI ve API senaryolari tamamen farkli step kelime dagarcigi kullanir; --channel ile
// sadece ilgili kanallarin stepleri alinir. Varsayilan: tum kanallar, kanal sutunu ile.

import fs from 'node:fs';
import path from 'node:path';
import { search, ROOT } from './lib/http.mjs';
import { FIELDS, val } from './lib/fields.mjs';
import { parseArgs } from './lib/format.mjs';

const { flags } = parseArgs(process.argv.slice(2));
const MAX = Number(flags.max) || 2000;
const STATUS = String(flags.status || 'Automated');
const OUT = path.resolve(ROOT, String(flags.out || 'docs/step-library.md'));
const CHANNELS = flags.channel ? String(flags.channel).split(',').map((s) => s.trim()) : null;

/** Short label so the channel column stays narrow. Joined with '/'. */
const CH_SHORT = {
  'WEB-Desktop': 'Web', 'Responsive-IOS': 'rIOS',
  'Mobil-Android': 'And', 'Mobil-IOS': 'iOS',
  'API-Web': 'APIw', 'API-Mobil': 'APIm',
};

const KEYWORDS = /^\s*(Given|When|Then|And|But|\*)\s+/i;

/** Replace concrete values with placeholders so variants collapse into one pattern. */
function normalize(text) {
  return text
    .replace(/"[^"]*"/g, '"<text>"')
    .replace(/'[^']*'/g, "'<text>'")
    .replace(/<[^>]+>/g, '<param>')          // Scenario Outline placeholders
    .replace(/\b\d+([.,]\d+)?\b/g, '<n>')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "I click continue button on Payment Summary Page" -> "Payment Summary Page" */
function areaOf(step) {
  const m = /\bon\s+(?:the\s+)?([A-Z][\w&-]*(?:\s+[A-Z][\w&-]*)*\s+Page)\b/.exec(step)
         || /\b([A-Z][\w&-]*(?:\s+[A-Z][\w&-]*)*\s+Page)\b/.exec(step);
  return m ? m[1] : 'Genel / sayfa belirtilmemis';
}

const main = async () => {
  console.log(`Xray'den '${STATUS}' statusundeki Cucumber testleri cekiliyor (max ${MAX})...`);
  const chClause = CHANNELS ? ` AND Channel IN (${CHANNELS.map((c) => `'${c}'`).join(',')})` : '';
  const jql = `project=AJETPSSD AND issuetype=Test AND "Test Type"=Cucumber AND status='${STATUS}'${chClause} ORDER BY updated DESC`;
  const { total, issues } = await search(jql, {
    fields: ['key', 'summary', 'status', FIELDS.cucumberScenario, FIELDS.channel, FIELDS.module],
    max: MAX,
  });
  console.log(`  ${issues.length} / ${total} senaryo alindi. Ayristiriliyor...`);

  const steps = new Map();   // normalized -> {count, keyword, examples:Set, area}
  const tables = new Map();  // data table header -> count
  let scenarioCount = 0;

  for (const issue of issues) {
    const body = issue.fields[FIELDS.cucumberScenario];
    if (!body || typeof body !== 'string') continue;
    scenarioCount++;
    const channel = val(issue.fields[FIELDS.channel]);
    for (const rawLine of body.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line) continue;
      if (line.startsWith('|')) {                       // data table row
        const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
        if (cells.some((c) => /^[a-z][A-Za-z]*$/.test(c))) {  // looks like a header row
          const k = cells.join(' | ');
          tables.set(k, (tables.get(k) || 0) + 1);
        }
        continue;
      }
      const m = KEYWORDS.exec(line);
      if (!m) continue;
      const keyword = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
      const text = line.replace(KEYWORDS, '').trim();
      if (!text) continue;
      const key = normalize(text);
      if (!steps.has(key)) steps.set(key, { count: 0, keywords: new Set(), examples: new Set(), channels: new Set(), area: areaOf(text) });
      const e = steps.get(key);
      e.count++;
      e.keywords.add(keyword === 'And' || keyword === 'But' ? null : keyword);
      if (channel) e.channels.add(channel);
      if (e.examples.size < 2 && text !== key) e.examples.add(text);
    }
  }

  // Group by page/area
  const byArea = new Map();
  for (const [text, e] of steps) {
    if (!byArea.has(e.area)) byArea.set(e.area, []);
    byArea.get(e.area).push({ text, ...e });
  }
  const areas = [...byArea.entries()]
    .map(([area, list]) => [area, list.sort((a, b) => b.count - a.count)])
    .sort((a, b) => b[1].reduce((s, x) => s + x.count, 0) - a[1].reduce((s, x) => s + x.count, 0));

  // ---- render ----
  const L = [];
  L.push('# Gherkin Step Kütüphanesi');
  L.push('');
  L.push('> **OTOMATİK ÜRETİLDİ** — elle düzenleme. Yenilemek için:');
  L.push('> `node scripts/build-step-library.mjs`');
  L.push('');
  L.push(`Kaynak: AJETPSSD'de **\`${STATUS}\`** statüsündeki ${scenarioCount} Cucumber senaryosu `);
  L.push(`(toplam ${total} eşleşen test). Üretim: ${new Date().toISOString().slice(0, 10)}`);
  L.push('');
  L.push('## Neden bu dosya önemli');
  L.push('');
  L.push('Bu katalogdaki her step, **koşan** bir senaryodan çıkarıldı — yani Java tarafında');
  L.push('karşılığı olan bir step definition **var**. Yeni BDD yazarken buradaki ifadeleri');
  L.push('birebir kullan. Uydurulmuş bir step, step definition bulunamadığı için senaryoyu');
  L.push('`UNDEFINED` yapar ve koşum patlar.');
  L.push('');
  L.push('Gerekli step burada yoksa: senaryoyu yine yaz, ama o satırı `# YENİ STEP` ile işaretle');
  L.push('ve geliştiriciden step definition iste. Sessizce benzer bir step uydurma.');
  L.push('');
  L.push('`<text>`, `<n>`, `<param>` yer tutucudur — yerine gerçek değeri koy.');
  L.push('');
  L.push('**Kanal sütunu kritik:** `Web`=WEB-Desktop · `rIOS`=Responsive-IOS · `And`=Mobil-Android ·');
  L.push('`iOS`=Mobil-IOS · `APIw`=API-Web · `APIm`=API-Mobil.');
  L.push('UI ve API senaryoları tamamen ayrı kelime dağarcığı kullanır — UI senaryosu yazarken');
  L.push('`API*` işaretli step\'leri kullanma, tersi de geçerli.');
  L.push('Sadece tek kanala odaklı katalog için: `node scripts/build-step-library.mjs --channel "Mobil-Android"`');
  L.push('');
  L.push(`**Özet:** ${steps.size} benzersiz step, ${areas.length} sayfa/alan.`);
  {
    const chCount = new Map();
    for (const e of steps.values()) for (const c of e.channels) chCount.set(c, (chCount.get(c) || 0) + 1);
    const line = [...chCount.entries()].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}: ${n}`).join(' · ');
    if (line) L.push(`Kanal bazında step sayısı — ${line}`);
  }
  L.push('');
  L.push('## İçindekiler');
  L.push('');
  for (const [area, list] of areas) {
    const anchor = area.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    L.push(`- [${area}](#${anchor}) — ${list.length} step`);
  }
  L.push('');

  for (const [area, list] of areas) {
    L.push(`## ${area}`);
    L.push('');
    L.push('| Kull. | Kanal | Anahtar | Step |');
    L.push('|---:|---|---|---|');
    for (const s of list) {
      const kw = [...s.keywords].filter(Boolean).join('/') || 'And';
      const ch = [...s.channels].map((c) => CH_SHORT[c] || c).sort().join('/') || '—';
      L.push(`| ${s.count} | ${ch} | ${kw} | \`${s.text.replace(/\|/g, '\\|')}\` |`);
    }
    L.push('');
  }

  const topTables = [...tables.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
  if (topTables.length) {
    L.push('## Sık kullanılan data table başlıkları');
    L.push('');
    L.push('| Kull. | Sütunlar |');
    L.push('|---:|---|');
    for (const [k, n] of topTables) L.push(`| ${n} | \`${k.replace(/\|/g, '\\|')}\` |`);
    L.push('');
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, L.join('\n'), 'utf8');
  console.log(`\nYazildi: ${OUT}`);
  console.log(`  ${scenarioCount} senaryo -> ${steps.size} benzersiz step, ${areas.length} alan`);
  console.log('\nEn cok kullanilan 10 step:');
  for (const s of [...steps.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 10)) {
    console.log(`  ${String(s[1].count).padStart(5)}  ${s[0].slice(0, 90)}`);
  }
};

main().catch((e) => { console.error('\nHATA:', e.message); process.exit(1); });
