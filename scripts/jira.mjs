#!/usr/bin/env node
// Single entry point for all Jira/Xray work in this repo.
//   node scripts/jira.mjs <command> [args] [--flags]
// Read commands run freely. Write commands refuse unless --confirm is passed.

import fs from 'node:fs';
import path from 'node:path';
import {
  jira, search, getIssue, exportFeature, getSteps, getRuns, loadEnv, currentUser, ROOT, JiraError,
  getExecTests, findRun, getRun, setRunStatus, setRunComment, addRunEvidence, addIssueAttachment, downloadEvidence,
  deleteRunEvidence, deleteIssueLink, getIssueLinks, addStep, deleteStep, addTestsTo, removeTestsFrom,
} from './lib/http.mjs';
import { FIELDS, TEST_FIELDS, TEST_META, PROJECTS, clean, val } from './lib/fields.mjs';
import { table, countBy, truncate, die, parseArgs } from './lib/format.mjs';

const { flags, pos } = parseArgs(process.argv.slice(2));
const [cmd, ...args] = pos;
const JSON_OUT = !!flags.json;
const out = (obj, pretty) => console.log(JSON_OUT ? JSON.stringify(obj, null, 2) : pretty);

const WRITE_COMMANDS = new Set(['unlink', 'detach', 'create', 'update', 'transition', 'comment', 'result', 'attach', 'note', 'link']);

function guardWrite() {
  if (flags['dry-run']) return false;
  if (!flags.confirm) {
    die(`'${cmd}' bir YAZMA komutu. Once --dry-run ile kontrol et, sonra --confirm ekle.`);
  }
  return true;
}

const HELP = `
Jira/Xray CLI  —  node scripts/jira.mjs <komut>

OKUMA
  search <jql>            JQL sorgusu            [--max N] [--count-by status|channel|type]
  get <KEY>               Issue detayi (temiz)
  feature <KEY...>        Xray'den .feature cikar [--out dosya]
  steps <KEY>             Manuel test adimlari
  runs <KEY>              Test kosum gecmisi (status/evidence/defect)
  story <KEY>             Story + kabul kriteri + bagli testler
  transitions <KEY>       Issue'nun gidebilecegi statuler
  links <KEY>             Issue baglantilari (id + yon)
  fields <desen>          Alan adi/id arama

SET / EXECUTION ICERIGI  (--confirm sart; once --dry-run)
  addto <SET|EXEC> --tests A,B         Test Set veya Test Execution'a test ekle
  removefrom <SET|EXEC> --tests A,B    Test Set veya Test Execution'dan test cikar
                          (execution'dan cikarmak o testin kosum kaydini siler)

KOSUM (execution)
  exec <EXECKEY>          Execution'daki testler  [--mine] [--status TODO,FAIL]
  run <TESTKEY> --exec <EXECKEY>        Tek kosumun tam detayi (not + kanit)
  evidence <TESTKEY> --exec <EXECKEY> --download <dizin>
                          Kosum gorsellerini diske indir

YAZMA  (--confirm sart; once --dry-run)
  create --project K --type T --summary S  [--field.<ad> deger]
  update <KEY> --field.<ad> deger
  transition <KEY> --to "Status"  [--comment "..."]
  comment <KEY> --body "<metin>|@<dosya>"  [--id <yorumId>] yorumu guncelle
  comments <KEY>          Yorumlari listele (id + onizleme)
  attachments <KEY>       Ekleri listele  [--id a,b] [--download <dizin>]
  detach <KEY> --id <N>                         Issue ekini sil
  link <TESTKEY> --to <BUGKEY> [--type Defect]  Bug'da 'created by <TEST>' gorunur
  unlink <linkId>                               Baglantiyi sil (once: links <KEY>)
  detach <TESTKEY> --exec <EXECKEY> --id <N>    Kosum kanitini sil
  result <TESTKEY> --exec <EXECKEY> --status PASS|FAIL|TODO  [--comment "..."]
  attach <KEY> --file <yol> [--name <ad>]              Issue'ya ek yukle
  attach <TESTKEY> --exec <EXECKEY> --file <yol>       Kosuma gorsel ekle
  note   <TESTKEY> --exec <EXECKEY> --body "<metin>|@<dosya>"    Kosum notu yaz

TEMPO (worklog)
  tempo list [--from YYYY-MM-DD] [--to YYYY-MM-DD]   Kayitlar + gunluk toplam / eksik saat
  tempo add <KEY> --hours 2.5 --servis web|ios|android --comment "..."
            [--date YYYY-MM-DD]   Sirket hep TKAJ. Kayit gir (--dry-run / --confirm)
  tempo delete <tempoWorklogId>                        Kayit sil (--confirm)

GENEL   --json ham cikti   |   Alan adlari: ${Object.keys(FIELDS).join(', ')}, priority, labels, components, assignee, fixVersions
Yeni Test issue'da zorunlu: --field.testLayer --field.scenarioType --field.priority
Projeler: tests=${PROJECTS.tests} exec=${PROJECTS.executions} req=${PROJECTS.requirements}
`;

/** Standard Jira text fields that need no custom-field id. */
const STD_FIELDS = new Set(['description', 'summary', 'environment']);

/** Standard fields Jira wants in a shape other than a plain string. */
const SHAPED_FIELDS = {
  labels:     (v) => String(v).split(',').map((s) => s.trim()).filter(Boolean),
  components: (v) => String(v).split(',').map((s) => ({ name: s.trim() })).filter((c) => c.name),
  priority:   (v) => ({ name: String(v) }),
  fixVersions:(v) => String(v).split(",").map((s) => ({ name: s.trim() })).filter((x) => x.name),
  assignee:   (v) => ({ name: String(v) }),
};

/** Long text often lives in a file — "@reports/body.txt" reads it in. */
function readValue(v) {
  const s = String(v);
  if (!s.startsWith('@')) return s;
  const p = path.resolve(ROOT, s.slice(1));
  if (!fs.existsSync(p)) die(`Dosya yok: ${p}`);
  return fs.readFileSync(p, 'utf8').trimEnd();
}

/** Collect --field.channel "Mobil-Android" into a Jira fields object. */
function collectFields() {
  const f = {};
  for (const [k, v] of Object.entries(flags)) {
    if (!k.startsWith('field.')) continue;
    const name = k.slice(6);
    if (STD_FIELDS.has(name)) { f[name] = readValue(v); continue; }
    if (SHAPED_FIELDS[name]) { f[name] = SHAPED_FIELDS[name](v); continue; }
    const id = FIELDS[name] || (/^customfield_\d+$/.test(name) ? name : null);
    if (!id) {
      die(`Bilinmeyen alan: ${name}. Gecerli: ${
        [...STD_FIELDS, ...Object.keys(SHAPED_FIELDS), ...Object.keys(FIELDS)].join(', ')}`);
    }
    // Option-type fields need {value}; free text stays a string. Caller can force with :raw
    f[id] = /^(channel|module|testType|cucumberTestType|testRunType|automation|process|bugType|qaProcess|qaOrigin|severity|team|testLayer|scenarioType|execType)$/.test(name)
      ? { value: String(v) }
      : name === 'releaseVersion' ? { name: String(v) } : readValue(v);
  }
  if (flags.summary) f.summary = String(flags.summary);
  if (flags.description) f.description = readValue(flags.description);
  return f;
}

/**
 * Turn a numbered plain-text block into Xray manual steps.
 * A line starting "<n>." opens a step; the expected result is a "BEKLENEN:" line and
 * attaches to the step it follows.
 */
function parseSteps(text) {
  const steps = [];
  for (const line of String(text).split(/\r?\n/)) {
    const t = line.trim();
    if (!t) continue;
    const num = t.match(/^\d+[.)]\s*(.+)$/);
    if (num) { steps.push({ step: num[1].trim(), data: '', result: '' }); continue; }
    const exp = t.match(/^BEKLENEN\s*:\s*(.+)$/i);
    if (exp) {
      if (!steps.length) die('BEKLENEN satiri ilk adimdan once gelemez.');
      const cur = steps[steps.length - 1];
      cur.result = cur.result ? `${cur.result} ${exp[1].trim()}` : exp[1].trim();
      continue;
    }
    // Continuation of the previous step or its expected result.
    if (!steps.length) die(`Numarasiz satir: "${truncate(t, 60)}"`);
    const cur = steps[steps.length - 1];
    if (cur.result) cur.result += ` ${t}`;
    else cur.step += ` ${t}`;
  }
  return steps;
}

/** Pull the three metadata values out of a built Jira fields object. */
function readMeta(fields) {
  return {
    testLayer:    fields[FIELDS.testLayer]?.value ?? null,
    scenarioType: fields[FIELDS.scenarioType]?.value ?? null,
    priority:     fields.priority?.name ?? null,
  };
}

/**
 * Guard the metadata a functional Test issue must carry. Runs BEFORE --dry-run prints,
 * so a bad value is caught at review time, not after --confirm.
 *
 * @param fields  built Jira fields object (from collectFields)
 * @param key     issue key when updating; null when creating
 */
async function validateTestMeta(fields, key) {
  const sent = readMeta(fields);

  // 1. Every value that was sent must be one the project actually offers.
  for (const [name, allowed] of Object.entries(TEST_META)) {
    if (name === 'forbidden' || sent[name] === null) continue;
    if (!allowed.includes(sent[name])) {
      die(`Gecersiz ${name}: "${sent[name]}"\n  Gecerli degerler: ${allowed.join(' | ')}`);
    }
  }

  // 2. Forbidden pairs. On update only one half may be sent, so merge with the issue.
  let merged = sent;
  if (key && (sent.testLayer || sent.scenarioType)) {
    const current = readMeta((await getIssue(key)).fields);
    merged = {
      testLayer:    sent.testLayer    ?? current.testLayer,
      scenarioType: sent.scenarioType ?? current.scenarioType,
      priority:     sent.priority     ?? current.priority,
    };
  }
  for (const combo of TEST_META.forbidden) {
    const hit = Object.entries(combo).every(([k, v]) => merged[k] === v);
    if (hit) {
      die(`Yasak kombinasyon: ${Object.entries(combo).map(([k, v]) => `${k}=${v}`).join(' + ')}\n` +
          `  Bu ikisi birlikte kullanilmaz. Birini degistir.`);
    }
  }

  // 3. A new Test must carry all three from the start.
  if (!key) {
    const missing = ['testLayer', 'scenarioType', 'priority'].filter((n) => !sent[n]);
    if (missing.length) {
      die(`Yeni Test issue'da zorunlu alan eksik: ${missing.join(', ')}\n` +
          missing.map((n) => `  --field.${n} <${TEST_META[n].join('|')}>`).join('\n'));
    }
  }
}

async function main() {
  switch (cmd) {
    case undefined: case 'help': case '--help':
      console.log(HELP); break;

    case 'search': {
      const jql = args.join(' ');
      if (!jql) die('JQL gerekli. Ornek: search "project=AJETPSSD AND status=\'Update Pending\'"');
      const fields = [...TEST_FIELDS];
      const { total, issues } = await search(jql, { fields, max: Number(flags.max) || 50 });
      if (JSON_OUT) return out({ total, issues });
      const pick = {
        status: (i) => i.fields.status?.name,
        channel: (i) => val(i.fields[FIELDS.channel]),
        type: (i) => i.fields.issuetype?.name,
        module: (i) => val(i.fields[FIELDS.module]),
      }[flags['count-by']];
      if (pick) {
        console.log(`Toplam ${total} issue\n`);
        return console.log(table(countBy(issues, pick), [['name', flags['count-by']], ['count', 'adet']]));
      }
      console.log(`Toplam ${total} issue — ${issues.length} tanesi gosteriliyor\n`);
      console.log(table(issues.map((i) => ({
        key: i.key,
        type: i.fields.issuetype?.name,
        status: i.fields.status?.name,
        channel: val(i.fields[FIELDS.channel]),
        summary: i.fields.summary,
      })), [['key', 'KEY'], ['type', 'TIP', 14], ['status', 'STATU', 18], ['channel', 'KANAL', 14], ['summary', 'OZET', 70]]));
      break;
    }

    case 'get': {
      const key = args[0] || die('KEY gerekli');
      const issue = await getIssue(key);
      if (JSON_OUT) return out(issue);
      const f = clean(issue.fields);
      console.log(`${issue.key}  —  ${f.summary}`);
      console.log(`${'-'.repeat(60)}`);
      for (const k of ['issuetype', 'status', 'assignee', 'reporter', 'channel', 'module', 'testType', 'cucumberTestType', 'testRunType', 'testLayer', 'scenarioType', 'priority', 'updated']) {
        if (f[k]) console.log(`  ${k.padEnd(18)} ${f[k]}`);
      }
      if (f.cucumberScenario) console.log(`\nCUCUMBER SCENARIO:\n${f.cucumberScenario}`);
      if (f.description) console.log(`\nDESCRIPTION:\n${truncate(f.description, 1500)}`);
      const links = issue.fields.issuelinks || [];
      if (links.length) {
        console.log(`\nBAGLANTILAR (${links.length}):`);
        for (const l of links.slice(0, 15)) {
          const o = l.outwardIssue || l.inwardIssue;
          if (o) console.log(`  ${(l.outwardIssue ? l.type.outward : l.type.inward).padEnd(14)} ${o.key}  ${truncate(o.fields?.summary, 60)}`);
        }
      }
      break;
    }

    case 'feature': {
      if (!args.length) die('En az bir KEY gerekli');
      const text = await exportFeature(args);
      if (flags.out) {
        const p = path.resolve(ROOT, String(flags.out));
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, text, 'utf8');
        console.log(`Yazildi: ${p} (${text.length} karakter)`);
      } else console.log(text);
      break;
    }

    case 'steps': {
      const key = args[0] || die('KEY gerekli');

      // --- write path: replace every manual step from a numbered text file ---
      if (flags.set !== undefined) {
        const text = readValue(String(flags.set));
        const parsed = parseSteps(text);
        if (!parsed.length) die('Adim bulunamadi. Her adim "1." gibi numarayla baslamali.');
        const existing = await getSteps(key);

        if (!guardWrite()) {
          console.log(`[DRY RUN] ${key} adimlari degistirilecek`);
          if (existing?.length) {
            console.log(`\nMEVCUT (${existing.length} adim, SILINECEK):`);
            existing.forEach((s, i) => console.log(`  ${i + 1}. ${truncate(s.step?.raw ?? s.step, 120)}`));
          } else {
            console.log('\nMEVCUT: adim yok');
          }
          console.log(`\nYENI (${parsed.length} adim):`);
          parsed.forEach((s, i) => {
            console.log(`  ${i + 1}. ${s.step}`);
            if (s.result) console.log(`     BEKLENEN: ${s.result}`);
          });
          return;
        }

        for (const s of existing || []) await deleteStep(key, s.id);
        for (const s of parsed) await addStep(key, s);
        const after = await getSteps(key);
        console.log(`${key}: ${after.length} adim yazildi (onceki ${existing?.length || 0} silindi)`);
        break;
      }

      const steps = await getSteps(key);
      if (JSON_OUT) return out(steps);
      if (!steps?.length) return console.log(`${key}: manuel adim yok (muhtemelen Cucumber tipi — 'get ${key}' dene)`);
      steps.forEach((s, i) => {
        console.log(`\n${i + 1}. ${truncate(s.step?.raw ?? s.step, 200)}`);
        if (s.data?.raw) console.log(`   VERI:     ${truncate(s.data.raw, 200)}`);
        if (s.result?.raw) console.log(`   BEKLENEN: ${truncate(s.result.raw, 200)}`);
      });
      break;
    }

    case 'addto': {
      // addto <SET|EXEC-KEY> --tests A,B,C
      const target = args[0] || die('Hedef KEY gerekli (Test Set veya Test Execution)');
      const keys = String(flags.tests || die('--tests A,B,C gerekli'))
        .split(',').map((s) => s.trim()).filter(Boolean);
      if (!keys.length) die('En az bir test key gerekli');
      const type = val((await getIssue(target, ['issuetype'])).fields.issuetype);
      const kind = type === 'Test Set' ? 'testset' : type === 'Test Execution' ? 'testexec' : null;
      if (!kind) die(`${target} bir Test Set veya Test Execution degil (${type}).`);
      if (!guardWrite()) {
        return console.log(`[DRY RUN] ${target} (${type}) icine ${keys.length} test eklenecek:\n  ${keys.join('\n  ')}`);
      }
      await addTestsTo(kind, target, keys);
      console.log(`${target}: ${keys.length} test eklendi`);
      break;
    }

    case 'tempo': {
      // Tempo Timesheets (Server). Read: v3 GET + core schedule. Write: v4 worklogs.
      const sub = args[0] || die('tempo list | add | delete');
      const SERVIS = { web: '5501', android: '5502', ios: '5503' };
      const today = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10); // Istanbul
      const me = await jira('/rest/api/2/myself'); // { name: '932357', key: 'JIRAUSER...' }

      if (sub === 'list') {
        const from = String(flags.from || (() => { const d = new Date(today); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.toISOString().slice(0, 10); })());
        const to = String(flags.to || today);
        const logs = await jira('/rest/tempo-timesheets/3/worklogs', { query: { dateFrom: from, dateTo: to, username: me.name } });
        const sched = await jira('/rest/tempo-core/1/user/schedule', { query: { from, to } });
        if (JSON_OUT) return out({ logs, sched });
        const rows = logs.map((w) => {
          const at = Object.fromEntries((w.worklogAttributes || []).map((a) => [a.key, a.value]));
          return { id: w.id, tarih: w.dateStarted.slice(0, 10), saat: w.timeSpentSeconds / 3600, issue: w.issue?.key, servis: at._Servis_ || '', sirket: at['_FaturalandırılacakŞirket_'] || '', yorum: truncate((w.comment || '').replace(/\s+/g, ' '), 60) };
        }).sort((a, b) => (a.tarih < b.tarih ? -1 : 1));
        console.log(table(rows.map((r) => ({ ...r, saat: String(r.saat) })), [['id', 'ID'], ['tarih', 'TARIH'], ['saat', 'SAAT'], ['issue', 'ISSUE'], ['servis', 'SERVIS'], ['sirket', 'SIRKET'], ['yorum', 'YORUM', 60]]));
        console.log('\nGUNLUK:');
        for (const d of sched.days || []) {
          if (d.date > to) continue;
          const got = rows.filter((r) => r.tarih === d.date).reduce((s, r) => s + r.saat, 0);
          const need = d.requiredSeconds / 3600;
          if (!need && !got) continue;
          console.log(`  ${d.date}  ${got}h / ${need}h${got < need ? `   EKSIK ${need - got}h` : ''}`);
        }
        break;
      }

      if (sub === 'add') {
        const key = args[1] || die('tempo add <ISSUE-KEY> gerekli');
        const hours = Number(String(flags.hours || die('--hours gerekli')).replace(',', '.'));
        if (!(hours > 0 && hours <= 12)) die('--hours 0-12 arasi olmali');
        const servisIn = String(flags.servis || die('--servis gerekli: web | ios | android | backend | <kod>'));
        // Ebrar rule (2026-11-20): only web / android / ios. Company is always TKAJ.
        const servis = SERVIS[servisIn.toLowerCase()] || (Object.values(SERVIS).includes(servisIn) ? servisIn : null);
        if (!servis) die(`Gecersiz servis: ${servisIn}. Yalnizca web (5501), android (5502), ios (5503).`);
        if (flags.account && String(flags.account) !== 'TKAJ') die('Faturalandirilacak sirket her zaman TKAJ. Degistirilemez.');
        const comment = String(flags.comment || die('--comment gerekli'));
        if (/[—–]/.test(comment)) die('Yorumda uzun tire var. Kisa tire (-) kullan.');
        const date = String(flags.date || today);
        const account = 'TKAJ';
        const issue = await getIssue(key, ['summary']);
        const body = {
          worker: me.key,
          originTaskId: issue.id,
          started: date,
          timeSpentSeconds: Math.round(hours * 3600),
          billableSeconds: Math.round(hours * 3600),
          comment,
          attributes: {
            _Servis_: { workAttributeId: 102, value: servis },
            '_FaturalandırılacakŞirket_': { workAttributeId: 21, value: account },
          },
        };
        if (!guardWrite()) {
          return console.log(`[DRY RUN] Tempo kaydi:\n  issue    ${key} - ${truncate(issue.fields.summary, 70)}\n  tarih    ${date}\n  sure     ${hours}h\n  servis   ${servis}\n  sirket   ${account}\n  yorum    ${comment}`);
        }
        const res = await jira('/rest/tempo-timesheets/4/worklogs', { method: 'POST', body });
        const w = Array.isArray(res) ? res[0] : res;
        console.log(`Tempo kaydi girildi: id ${w.tempoWorklogId}  ${key}  ${date}  ${hours}h  servis ${servis}  sirket ${account}`);
        break;
      }

      if (sub === 'delete') {
        const id = args[1] || die('tempo delete <tempoWorklogId> gerekli');
        if (!guardWrite()) return console.log(`[DRY RUN] Tempo kaydi silinecek: ${id}`);
        await jira(`/rest/tempo-timesheets/4/worklogs/${id}`, { method: 'DELETE', raw: true });
        console.log(`Tempo kaydi silindi: ${id}`);
        break;
      }
      die(`Bilinmeyen tempo alt komutu: ${sub}`);
      break;
    }

    case 'removefrom': {
      // removefrom <SET|EXEC-KEY> --tests A,B,C
      const target = args[0] || die('Hedef KEY gerekli (Test Set veya Test Execution)');
      const keys = String(flags.tests || die('--tests A,B,C gerekli'))
        .split(',').map((s) => s.trim()).filter(Boolean);
      if (!keys.length) die('En az bir test key gerekli');
      const type = val((await getIssue(target, ['issuetype'])).fields.issuetype);
      const kind = type === 'Test Set' ? 'testset' : type === 'Test Execution' ? 'testexec' : null;
      if (!kind) die(`${target} bir Test Set veya Test Execution degil (${type}).`);
      if (!guardWrite()) {
        return console.log(`[DRY RUN] ${target} (${type}) icinden ${keys.length} test cikarilacak:\n  ${keys.join('\n  ')}`);
      }
      await removeTestsFrom(kind, target, keys);
      console.log(`${target}: ${keys.length} test cikarildi`);
      break;
    }

    case 'runs': {
      const key = args[0] || die('KEY gerekli');
      const runs = await getRuns(key);
      if (JSON_OUT) return out(runs);
      if (!runs?.length) return console.log(`${key}: kosum kaydi yok`);
      console.log(table(runs.map((r) => ({
        exec: r.testExecKey, status: r.status, by: r.executedBy,
        when: (r.finishedOnIso || r.startedOnIso || '').slice(0, 16).replace('T', ' '),
        ev: r.evidences?.length || 0, def: r.defects?.length || 0,
      })), [['exec', 'EXEC'], ['status', 'SONUC', 8], ['by', 'KOSAN', 12], ['when', 'TARIH', 16], ['ev', 'EK'], ['def', 'BUG']]));
      const defects = runs.flatMap((r) => r.defects || []).map((d) => d.key || d);
      if (defects.length) console.log(`\nBagli defect'ler: ${[...new Set(defects)].join(', ')}`);
      break;
    }

    case 'story': {
      const key = args[0] || die('KEY gerekli');
      const issue = await getIssue(key);
      const f = clean(issue.fields);
      console.log(`${issue.key}  [${f.issuetype} / ${f.status}]  —  ${f.summary}\n${'-'.repeat(60)}`);
      if (f.description) console.log(`ACIKLAMA / KABUL KRITERI:\n${truncate(f.description, 4000)}\n`);
      const links = (issue.fields.issuelinks || [])
        .map((l) => l.outwardIssue || l.inwardIssue).filter(Boolean);
      const tests = links.filter((o) => /Test/.test(o.fields?.issuetype?.name || ''));
      if (tests.length) {
        console.log(`BAGLI TESTLER (${tests.length}):`);
        console.log(table(tests.map((t) => ({ key: t.key, status: t.fields?.status?.name, summary: t.fields?.summary })),
          [['key', 'KEY'], ['status', 'STATU', 18], ['summary', 'OZET', 70]]));
      } else console.log('(bagli test bulunamadi)');
      break;
    }

    case 'transitions': {
      const key = args[0] || die('KEY gerekli');
      const t = await jira(`/rest/api/2/issue/${key}/transitions`);
      console.log(table(t.transitions.map((x) => ({ id: x.id, name: x.to.name })), [['id', 'ID'], ['name', 'HEDEF STATU']]));
      break;
    }

    case 'fields': {
      const pattern = new RegExp(args.join(' ') || '.', 'i');
      const all = await jira('/rest/api/2/field');
      const hits = all.filter((f) => pattern.test(f.name) || pattern.test(f.id));
      console.log(table(hits.slice(0, 60).map((f) => ({ id: f.id, name: f.name })), [['id', 'ID', 24], ['name', 'AD', 60]]));
      console.log(`\n${hits.length} eslesme (${all.length} alan icinde)`);
      break;
    }

    // ---------------- EXECUTION ----------------
    case 'exec': {
      const key = args[0] || die('EXECKEY gerekli. Aktif olanlar icin: search "issuetype=\'Test Execution\' AND status in (Open,\'In Progress\')"');
      let tests = await getExecTests(key, Number(flags.limit) || 500);
      if (!Array.isArray(tests)) die(`Beklenmeyen yanit: ${JSON.stringify(tests).slice(0, 200)}`);
      const all = tests.length;
      if (flags.mine) {
        const me = await currentUser();
        tests = tests.filter((t) => t.assignee === me);
      }
      if (flags.status) {
        const want = String(flags.status).toUpperCase().split(',').map((s) => s.trim());
        tests = tests.filter((t) => want.includes(String(t.status).toUpperCase()));
      }
      if (JSON_OUT) return out(tests);
      console.log(`${key} — ${all} test${flags.mine ? `, ${tests.length} tanesi sana atanmis` : ''}` +
                  `${flags.status ? ` (statu: ${flags.status})` : ''}\n`);
      if (!tests.length) return console.log('(eslesme yok)');
      console.log(table(tests.map((t) => ({
        key: t.key, status: t.status, assignee: t.assignee || '—',
        ev: (t.evidences || []).length, def: (t.defects || []).length,
        note: t.comment ? 'var' : '—',
      })), [['key', 'TEST'], ['status', 'SONUC', 9], ['assignee', 'ATANAN', 10], ['ev', 'KANIT'], ['def', 'BUG'], ['note', 'NOT']]));
      const dist = countBy(tests, (t) => t.status);
      console.log(`\nDagilim: ${dist.map((d) => `${d.name} ${d.count}`).join(' · ')}`);
      break;
    }

    case 'run': {
      const test = args[0] || die('TESTKEY gerekli');
      const exec = String(flags.exec || die('--exec <EXECKEY> gerekli'));
      const brief = await findRun(test, exec);
      if (!brief?.id) die(`${exec} icinde ${test} kosumu bulunamadi`);
      const r = await getRun(brief.id);
      if (JSON_OUT) return out(r);
      console.log(`${test} @ ${exec}  —  run ${r.id}`);
      console.log('-'.repeat(60));
      console.log(`  statu        ${r.status}`);
      console.log(`  atanan       ${r.assignee || '—'}`);
      console.log(`  kosan        ${r.executedBy || '—'}`);
      console.log(`  tarih        ${(r.finishedOnIso || r.startedOnIso || '—').slice(0, 16).replace('T', ' ')}`);
      const note = typeof r.comment === 'object' ? r.comment?.raw : r.comment;
      if (note) console.log(`\nKOSUM NOTU:\n${note}`);
      const ev = r.evidences || [];
      if (ev.length) {
        console.log(`\nKANITLAR (${ev.length}):`);
        for (const e of ev) console.log(`  [${e.id}] ${e.fileName}  ${e.fileSize}  ${e.author}`);
      }
      if (r.defects?.length) console.log(`\nDEFECT: ${r.defects.map((d) => d.key || d).join(', ')}`);
      break;
    }

    case 'evidence': {
      const test = args[0] || die('TESTKEY gerekli');
      const exec = String(flags.exec || die('--exec <EXECKEY> gerekli'));
      const brief = await findRun(test, exec);
      if (!brief?.id) die(`${exec} icinde ${test} kosumu bulunamadi`);
      const r = await getRun(brief.id);
      const ev = r.evidences || [];
      if (!ev.length) return console.log(`${test} @ ${exec}: kanit yok`);
      if (!flags.download) {
        console.log(table(ev.map((e) => ({ id: e.id, file: e.fileName, size: e.fileSize, author: e.author })),
          [['id', 'ID'], ['file', 'DOSYA', 40], ['size', 'BOYUT', 10], ['author', 'EKLEYEN', 12]]));
        return console.log('\nIndirmek icin: --download <dizin>');
      }
      const dir = path.resolve(ROOT, String(flags.download));
      fs.mkdirSync(dir, { recursive: true });
      for (const e of ev) {
        const buf = await downloadEvidence(e.fileURL);
        const dest = path.join(dir, e.fileName);
        fs.writeFileSync(dest, buf);
        console.log(`  ${e.fileName}  ${buf.length} bayt  ->  ${dest}`);
      }
      console.log(`\n${ev.length} dosya indirildi: ${dir}`);
      break;
    }

    // ---------------- WRITE ----------------
    case 'create': {
      const body = {
        fields: {
          project: { key: String(flags.project || die('--project gerekli')) },
          issuetype: { name: String(flags.type || die('--type gerekli')) },
          ...collectFields(),
        },
      };
      if (!body.fields.summary) die('--summary gerekli');
      if (String(flags.type) === 'Test') await validateTestMeta(body.fields, null);
      if (!guardWrite()) return console.log('[DRY RUN] gonderilecek:\n' + JSON.stringify(body, null, 2));
      const res = await jira('/rest/api/2/issue', { method: 'POST', body });
      console.log(`Olusturuldu: ${res.key}\n  ${loadBase()}/browse/${res.key}`);
      break;
    }

    case 'update': {
      const key = args[0] || die('KEY gerekli');
      const fields = collectFields();
      if (!Object.keys(fields).length) die('En az bir --field.<ad> veya --summary gerekli');
      await validateTestMeta(fields, key);
      if (!guardWrite()) return console.log(`[DRY RUN] ${key} guncellenecek:\n` + JSON.stringify({ fields }, null, 2));
      await jira(`/rest/api/2/issue/${key}`, { method: 'PUT', body: { fields } });
      console.log(`Guncellendi: ${key}`);
      break;
    }

    case 'link': {
      // link <INWARD> --type Defect --to <OUTWARD>
      // Defect: inward "created by", outward "created" -> test created bug.
      const from = args[0] || die('KEY gerekli (inward taraf)');
      const to = String(flags.to || die('--to <KEY> gerekli (outward taraf)'));
      const type = String(flags.type || 'Defect');
      const body = { type: { name: type }, inwardIssue: { key: from }, outwardIssue: { key: to } };
      if (!guardWrite()) return console.log(`[DRY RUN] ${type}: ${from} -> ${to}\n` + JSON.stringify(body, null, 2));
      await jira('/rest/api/2/issueLink', { method: 'POST', body });
      console.log(`Baglandi (${type}): ${from} -> ${to}`);
      break;
    }

    case 'transition': {
      const key = args[0] || die('KEY gerekli');
      const to = String(flags.to || die('--to "Status" gerekli'));
      const { transitions } = await jira(`/rest/api/2/issue/${key}/transitions`);
      const t = transitions.find((x) => x.to.name.toLowerCase() === to.toLowerCase());
      if (!t) die(`'${to}' statusune gecis yok. Mevcut: ${transitions.map((x) => x.to.name).join(' | ')}`);
      const body = { transition: { id: t.id } };
      if (flags.comment) body.update = { comment: [{ add: { body: String(flags.comment) } }] };
      if (!guardWrite()) return console.log(`[DRY RUN] ${key}: ${to} (transition ${t.id})`);
      await jira(`/rest/api/2/issue/${key}/transitions`, { method: 'POST', body });
      console.log(`${key} -> ${to}`);
      break;
    }

    case 'comment': {
      const key = args[0] || die('KEY gerekli');
      const body = readValue(flags.body || die('--body "..." veya --body @<dosya> gerekli'));
      const cid = flags.id ? String(flags.id) : null;
      const what = cid ? `yorum ${cid} guncellenecek` : 'yeni yorum';
      if (!guardWrite()) return console.log(`[DRY RUN] ${key} ${what}:\n${'-'.repeat(50)}\n${body}\n${'-'.repeat(50)}`);
      if (cid) {
        await jira(`/rest/api/2/issue/${key}/comment/${cid}`, { method: 'PUT', body: { body } });
        console.log(`Yorum guncellendi: ${key} #${cid}`);
      } else {
        await jira(`/rest/api/2/issue/${key}/comment`, { method: 'POST', body: { body } });
        console.log(`Yorum eklendi: ${key}`);
      }
      break;
    }

    case 'comments': {
      const key = args[0] || die('KEY gerekli');
      const d = await jira(`/rest/api/2/issue/${key}?fields=comment`);
      const list = (d.fields?.comment?.comments || []).map(c => ({
        id: c.id,
        author: c.author?.name || '-',
        created: c.created.slice(0, 16).replace('T', ' '),
        preview: truncate(c.body.replace(/\s+/g, ' '), 60),
      }));
      out(list, table(list, [['id', 'ID'], ['author', 'YAZAN'], ['created', 'TARIH'], ['preview', 'ONIZLEME']]));
      break;
    }

    case 'attachments': {
      const key = args[0] || die('KEY gerekli');
      const d = await jira(`/rest/api/2/issue/${key}?fields=attachment`);
      const all = d.fields?.attachment || [];
      const only = flags.id ? String(flags.id).split(',') : null;
      const picked = only ? all.filter(a => only.includes(String(a.id))) : all;

      if (flags.download) {
        const dir = path.resolve(ROOT, String(flags.download));
        fs.mkdirSync(dir, { recursive: true });
        for (const a of picked) {
          const buf = await downloadEvidence(a.content);
          const dest = path.join(dir, a.filename);
          fs.writeFileSync(dest, buf);
          console.log(`Indirildi: ${a.filename}  (${Math.round(a.size / 1024)} KB) -> ${dest}`);
        }
        if (!picked.length) console.log('(indirilecek ek yok)');
        break;
      }

      const list = picked.map(a => ({
        id: a.id,
        filename: a.filename,
        kb: Math.round(a.size / 1024),
        created: a.created.slice(0, 10),
      }));
      out(list, table(list, [['id', 'ID'], ['filename', 'DOSYA'], ['kb', 'KB'], ['created', 'TARIH']]));
      break;
    }

    case 'result': {
      const test = args[0] || die('TESTKEY gerekli');
      const exec = String(flags.exec || die('--exec <EXECKEY> gerekli'));
      const status = String(flags.status || die('--status PASS|FAIL|TODO gerekli')).toUpperCase();
      const run = await jira('/rest/raven/1.0/api/testrun', { query: { testExecIssueKey: exec, testIssueKey: test } });
      const id = run?.id || die(`${exec} icinde ${test} kosumu bulunamadi`);
      if (!guardWrite()) return console.log(`[DRY RUN] run ${id} (${test} @ ${exec}) -> ${status}`);
      await jira(`/rest/raven/1.0/api/testrun/${id}/status`, { method: 'PUT', query: { status } });
      if (flags.comment) {
        await jira(`/rest/raven/1.0/api/testrun/${id}/comment`, { method: 'PUT', body: String(flags.comment) });
      }
      console.log(`${test} @ ${exec} -> ${status}`);
      break;
    }

    case 'attach': {
      const test = args[0] || die('ISSUEKEY gerekli');
      const exec = flags.exec ? String(flags.exec) : null;
      const file = path.resolve(ROOT, String(flags.file || die('--file <yol> gerekli')));
      if (!fs.existsSync(file)) die(`Dosya yok: ${file}`);
      const brief = exec ? await findRun(test, exec) : null;
      if (exec && !brief?.id) die(`${exec} icinde ${test} kosumu bulunamadi`);
      const buf = fs.readFileSync(file);
      const filename = String(flags.name || path.basename(file));
      const ext = path.extname(filename).toLowerCase();
      const contentType = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.gif': 'image/gif', '.webp': 'image/webp', '.pdf': 'application/pdf',
        '.txt': 'text/plain', '.log': 'text/plain' }[ext] || 'application/octet-stream';
      const hedef = exec ? `run ${brief.id} (${test} @ ${exec})` : `issue ${test}`;
      if (!guardWrite()) {
        return console.log(`[DRY RUN] ${hedef} <- ${filename}` +
          `\n  tip: ${contentType}  boyut: ${buf.length} bayt`);
      }
      const res = exec
        ? await addRunEvidence(brief.id, { data: buf.toString('base64'), filename, contentType })
        : await addIssueAttachment(test, { buffer: buf, filename, contentType });
      const id = Array.isArray(res) ? res[0]?.id : res?.id;
      console.log(`Eklendi: ${filename} -> ${hedef}` + (id ? `  (attachment ${id})` : ''));
      break;
    }

    case 'links': {
      const key = args[0] || die('KEY gerekli');
      const list = await getIssueLinks(key);
      out(list, table(list, [['id','LINK ID'],['label','YON'],['other','DIGER'],['type','TIP']]));
      break;
    }

    case 'unlink': {
      const id = args[0] || die('link id gerekli (once: jira.mjs links <KEY>)');
      if (!guardWrite()) return console.log(`[DRY RUN] issue link ${id} silinecek`);
      await deleteIssueLink(id);
      console.log(`Link silindi: ${id}`);
      break;
    }

    case 'detach': {
      const test = args[0] || die('ISSUEKEY gerekli');
      const attId = String(flags.id || die('--id <attachmentId> gerekli (once: jira.mjs attachments <KEY>)'));
      if (!flags.exec) {
        // Issue attachment, not run evidence.
        if (!guardWrite()) return console.log(`[DRY RUN] ${test} eki ${attId} silinecek`);
        await jira(`/rest/api/2/attachment/${attId}`, { method: 'DELETE' });
        console.log(`Ek silindi: ${attId} <- ${test}`);
        break;
      }
      const exec = String(flags.exec);
      const brief = await findRun(test, exec);
      if (!brief?.id) die(`${exec} icinde ${test} kosumu bulunamadi`);
      if (!guardWrite()) return console.log(`[DRY RUN] run ${brief.id} kaniti ${attId} silinecek`);
      await deleteRunEvidence(brief.id, attId);
      console.log(`Kanit silindi: ${attId} <- ${test} @ ${exec}`);
      break;
    }

    case 'note': {
      const test = args[0] || die('TESTKEY gerekli');
      const exec = String(flags.exec || die('--exec <EXECKEY> gerekli'));
      let body = String(flags.body || die('--body "<metin>" veya --body @<dosya> gerekli'));
      if (body.startsWith('@')) {
        const p = path.resolve(ROOT, body.slice(1));
        if (!fs.existsSync(p)) die(`Not dosyasi yok: ${p}`);
        body = fs.readFileSync(p, 'utf8').trim();
      }
      const brief = await findRun(test, exec);
      if (!brief?.id) die(`${exec} icinde ${test} kosumu bulunamadi`);
      if (!guardWrite()) return console.log(`[DRY RUN] ${test} @ ${exec} kosum notu:\n${'-'.repeat(50)}\n${body}`);
      await setRunComment(brief.id, body);
      console.log(`Kosum notu yazildi: ${test} @ ${exec}`);
      break;
    }

    default:
      die(`Bilinmeyen komut: ${cmd}\n${HELP}`);
  }
}

const loadBase = () => loadEnv().JIRA_BASE_URL.replace(/\/$/, '');

main().catch((e) => {
  if (e instanceof JiraError) die(e.message);
  die(e.stack || e.message);
});
