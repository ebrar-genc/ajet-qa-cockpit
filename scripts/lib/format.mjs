// Terminal output helpers. Plain ASCII-safe tables, no deps.

const strip = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

export function truncate(s, n) {
  s = strip(s);
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

/**
 * Render rows as an aligned table.
 * @param {Array<Object>} rows
 * @param {Array<[key:string, header:string, width?:number]>} cols
 */
export function table(rows, cols) {
  if (!rows.length) return '(sonuc yok)';
  const data = rows.map((r) => cols.map(([k, , w]) => (w ? truncate(r[k], w) : strip(r[k]))));
  const widths = cols.map(([, h], i) => Math.max(h.length, ...data.map((d) => d[i].length)));
  const line = (cells) => cells.map((c, i) => c.padEnd(widths[i])).join('  ').trimEnd();
  return [
    line(cols.map(([, h]) => h)),
    line(widths.map((w) => '-'.repeat(w))),
    ...data.map(line),
  ].join('\n');
}

/** Group rows by a key and return a count table, highest first. */
export function countBy(items, fn) {
  const m = new Map();
  for (const it of items) {
    const k = fn(it) ?? '(bos)';
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
}

export function die(msg) {
  console.error(`\nHATA: ${msg}\n`);
  process.exit(1);
}

/** Minimal flag parser: --key value, --flag, and positional args. */
export function parseArgs(argv) {
  const flags = {}, pos = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) flags[key] = true;
      else { flags[key] = next; i++; }
    } else pos.push(a);
  }
  return { flags, pos };
}
