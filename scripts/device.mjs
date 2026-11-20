#!/usr/bin/env node
// Android device driver over adb. Used for agent-driven manual test runs.
// Usage:
//   node scripts/device.mjs shot [name]        screenshot -> reports/device/<name>.png
//   node scripts/device.mjs ui                 list visible elements (text/id/desc + center)
//   node scripts/device.mjs tap <x> <y>        tap at device pixel coords
//   node scripts/device.mjs tapText "<text>"   tap first element whose text/desc contains <text>
//   node scripts/device.mjs box "<text>"        bounds x1,y1,x2,y2 of matching elements (for evidence markup)
//   node scripts/device.mjs type "<text>"      type text into focused field
//   node scripts/device.mjs key <BACK|HOME|ENTER|...>
//   node scripts/device.mjs swipe <x1> <y1> <x2> <y2> [ms]
//   node scripts/device.mjs launch <package>   start app
//   node scripts/device.mjs stop <package>     force-stop app
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const adbLocal = join(root, '.tools', 'platform-tools', process.platform === 'win32' ? 'adb.exe' : 'adb');
const ADB = existsSync(adbLocal) ? adbLocal : 'adb';
const outDir = join(root, 'reports', 'device');

const adb = (args, opts = {}) => execFileSync(ADB, args, { maxBuffer: 64 << 20, ...opts });
const sh = (cmd) => adb(['shell', cmd]).toString();

function dumpUi() {
  sh('uiautomator dump /sdcard/ui.xml >/dev/null');
  const xml = adb(['exec-out', 'cat', '/sdcard/ui.xml']).toString();
  const nodes = [];
  for (const m of xml.matchAll(/<node ([^>]*?)\/?>/g)) {
    const a = Object.fromEntries([...m[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const b = a.bounds?.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
    if (!b) continue;
    const [x1, y1, x2, y2] = b.slice(1).map(Number);
    if (x2 <= x1 || y2 <= y1) continue;
    const label = a.text || a['content-desc'] || '';
    const id = (a['resource-id'] || '').replace(/^.*:id\//, '');
    if (!label && !id && a.clickable !== 'true') continue;
    nodes.push({ label, id, cls: (a.class || '').split('.').pop(), click: a.clickable === 'true',
      x: (x1 + x2) >> 1, y: (y1 + y2) >> 1, box: [x1, y1, x2, y2] });
  }
  return nodes;
}

const [cmd, ...args] = process.argv.slice(2);
switch (cmd) {
  case 'shot': {
    mkdirSync(outDir, { recursive: true });
    const file = join(outDir, `${args[0] || 'screen'}.png`);
    writeFileSync(file, adb(['exec-out', 'screencap', '-p']));
    console.log(file);
    break;
  }
  case 'ui':
    for (const n of dumpUi())
      console.log(`${n.click ? '*' : ' '} (${n.x},${n.y}) ${n.cls} ${n.id ? '#' + n.id + ' ' : ''}${n.label ? JSON.stringify(n.label) : ''}`);
    break;
  case 'tap': sh(`input tap ${args[0]} ${args[1]}`); break;
  case 'tapText': {
    const q = args[0].toLowerCase();
    const n = dumpUi().find((n) => n.label.toLowerCase().includes(q));
    if (!n) { console.error(`not found: ${args[0]}`); process.exit(1); }
    sh(`input tap ${n.x} ${n.y}`);
    console.log(`tapped ${JSON.stringify(n.label)} at (${n.x},${n.y})`);
    break;
  }
  case 'box': {
    // box "<text>" -> x1,y1,x2,y2 of every element whose text/desc contains <text>
    const q = args[0].toLowerCase();
    const hits = dumpUi().filter((n) => n.label.toLowerCase().includes(q));
    if (!hits.length) { console.error('not found: ' + args[0]); process.exit(1); }
    for (const n of hits) console.log(n.box.join(',') + '  ' + JSON.stringify(n.label));
    break;
  }
  case 'type': sh(`input text ${JSON.stringify(args[0].replace(/ /g, '%s'))}`); break;
  case 'key': sh(`input keyevent KEYCODE_${args[0].toUpperCase()}`); break;
  case 'swipe': sh(`input swipe ${args.slice(0, 4).join(' ')} ${args[4] || 300}`); break;
  case 'launch': sh(`monkey -p ${args[0]} -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1`); break;
  case 'stop': sh(`am force-stop ${args[0]}`); break;
  default:
    console.log('commands: shot [name] | ui | tap x y | tapText "t" | box "t" | type "t" | key K | swipe x1 y1 x2 y2 [ms] | launch pkg | stop pkg');
}
