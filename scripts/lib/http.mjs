// Jira Server/DC + Xray (raven) HTTP layer.
// No external dependencies: uses node:https so we can attach the corporate CA bundle.
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Parse .env (KEY=VALUE, # comments, optional quotes) without adding a dotenv dep. */
export function loadEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) throw new Error(`.env bulunamadi: ${file}`);
  const env = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m || line.trim().startsWith('#')) continue;
    env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  for (const k of ['JIRA_BASE_URL', 'XRAY_TOKEN']) {
    if (!env[k]) throw new Error(`.env icinde ${k} eksik`);
  }
  return env;
}

let _me;
/**
 * Jira username of the token owner — Xray stores run assignee as this name.
 * Honours JIRA_USER from .env, otherwise asks Jira once and caches it.
 */
export async function currentUser() {
  if (_me) return _me;
  const env = loadEnv();
  if (env.JIRA_USER) return (_me = env.JIRA_USER);
  const who = await jira('/rest/api/2/myself');
  if (!who?.name) throw new Error('Kullanici adi alinamadi (/rest/api/2/myself)');
  return (_me = who.name);
}

let _ca;
function ca() {
  if (_ca === undefined) {
    const p = path.join(ROOT, 'certs', 'corp-ca-bundle.pem');
    _ca = fs.existsSync(p) ? fs.readFileSync(p) : null;
  }
  return _ca;
}

export class JiraError extends Error {
  constructor(status, url, body) {
    const detail = (() => {
      try {
        const j = JSON.parse(body);
        const msgs = [...(j.errorMessages || []), ...Object.entries(j.errors || {}).map(([k, v]) => `${k}: ${v}`)];
        if (msgs.length) return msgs.join(' | ');
      } catch { /* not JSON */ }
      return String(body).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
    })();
    super(`HTTP ${status} — ${url}\n  ${detail || '(govde bos)'}`);
    this.name = 'JiraError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Low-level request against the Jira base URL.
 * @param {string} p  path starting with /rest/... (or a full URL)
 * @param {{method?:string, body?:any, raw?:boolean, query?:Record<string,any>,
 *          contentType?:string, binary?:boolean}} opts
 * @returns {Promise<any>} parsed JSON, a string when raw, or a Buffer when binary
 */
export function jira(p, opts = {}) {
  const env = loadEnv();
  const { method = 'GET', body, raw = false, query, contentType, binary = false, extraHeaders } = opts;
  const url = new URL(p.startsWith('http') ? p : env.JIRA_BASE_URL.replace(/\/$/, '') + p);
  for (const [k, v] of Object.entries(query || {})) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }

  const payload = body === undefined ? null
    : Buffer.isBuffer(body) ? body
    : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));

  const headers = {
    Authorization: `Bearer ${env.XRAY_TOKEN}`,
    Accept: raw ? '*/*' : 'application/json',
    'User-Agent': 'thy-qa-cockpit',
  };
  if (payload) {
    headers['Content-Type'] = contentType || 'application/json';
    headers['Content-Length'] = payload.length;
  }
  Object.assign(headers, extraHeaders || {});

  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: url.hostname, port: url.port || 443, path: url.pathname + url.search, method, headers, ca: ca() },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          // Follow the one redirect Jira uses for attachment downloads.
          if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
            const next = new URL(res.headers.location, url).toString();
            return resolve(jira(next, opts));
          }
          if (res.statusCode >= 400) return reject(new JiraError(res.statusCode, url.pathname, buf.toString('utf8')));
          if (binary) return resolve(buf);
          const text = buf.toString('utf8');
          if (raw) return resolve(text);
          if (!text) return resolve(null);
          try { resolve(JSON.parse(text)); } catch { resolve(text); }
        });
      },
    );
    req.on('error', (e) => reject(new Error(
      `Baglanti hatasi (${url.hostname}): ${e.message}` +
      (/certificate|CERT/i.test(e.message) ? '\n  Ipucu: certs/corp-ca-bundle.pem eksik veya guncel degil.' : ''),
    )));
    if (payload) req.write(payload);
    req.end();
  });
}

/** JQL search with sane defaults. Set max to Infinity to page through everything. */
export async function search(jql, { fields = ['key', 'summary', 'status', 'issuetype', 'assignee', 'updated'], max = 50 } = {}) {
  const out = [];
  let startAt = 0, total = 0;
  do {
    const page = await jira('/rest/api/2/search', {
      method: 'POST',
      body: { jql, fields, startAt, maxResults: Math.min(100, max - out.length) },
    });
    total = page.total;
    out.push(...page.issues);
    startAt += page.issues.length;
    if (!page.issues.length) break;
  } while (out.length < Math.min(max, total));
  return { total, issues: out };
}

export const getIssue = (key, fields) =>
  jira(`/rest/api/2/issue/${key}`, { query: fields ? { fields: fields.join(',') } : undefined });

/** Xray: export tests as a Gherkin .feature file (plain text). */
export const exportFeature = (keys) =>
  jira('/rest/raven/1.0/export/test', { raw: true, query: { keys: [].concat(keys).join(';') } });

/** Xray: manual test steps for a Test issue. */
export const getSteps = (key) => jira(`/rest/raven/1.0/api/test/${key}/step`);

/** Xray: all runs of a Test issue (status, evidence, defects). */
export const getRuns = (key) => jira(`/rest/raven/1.0/api/test/${key}/testruns`);

/**
 * Xray: append one manual step.
 * The collection resource takes PUT to create (POST is only on /step/<id>, which edits
 * an existing step) — confirmed from its WADL on jira.thy.com.
 */
export const addStep = (key, { step, data = '', result = '' }) =>
  jira(`/rest/raven/1.0/api/test/${key}/step`, {
    method: 'PUT',
    body: { step, data, result },
  });

/**
 * Xray: add Test issues to a Test Set or Test Execution.
 * Both collections take POST {add:[keys]} — confirmed from their WADL.
 */
export const addTestsTo = (kind, key, testKeys) =>
  jira(`/rest/raven/1.0/api/${kind}/${key}/test`, {
    method: 'POST',
    body: { add: [].concat(testKeys) },
  });

/** Xray: Test keys already inside a Test Set. */
export const getSetTests = (key) => jira(`/rest/raven/1.0/api/testset/${key}/test`);

/** Xray: delete one manual step by its numeric id. */
export const deleteStep = (key, id) =>
  jira(`/rest/raven/1.0/api/test/${key}/step/${id}`, { method: 'DELETE', raw: true });

// ---------------------------------------------------------------- test runs

/** Server-enforced ceiling for /testexec/<key>/test — larger values return HTTP 400. */
const EXEC_PAGE = 200;

/**
 * Xray: every test run inside a Test Execution, paginated.
 * `limit` is MANDATORY on this endpoint (omitting it returns HTTP 400) and capped at 200.
 * `detailed=true` adds assignee, evidences, comment and defects in the same call,
 * which saves one request per test.
 */
export async function getExecTests(execKey, max = Infinity) {
  const out = [];
  for (let page = 1; out.length < max; page++) {
    const batch = await jira(`/rest/raven/1.0/api/testexec/${execKey}/test`, {
      query: { limit: Math.min(EXEC_PAGE, max - out.length), page, detailed: true },
    });
    if (!Array.isArray(batch) || !batch.length) break;
    out.push(...batch);
    if (batch.length < EXEC_PAGE) break;
  }
  return out;
}

/** Xray: the single run of a Test inside a Test Execution. */
export const findRun = (testKey, execKey) =>
  jira('/rest/raven/1.0/api/testrun', { query: { testExecIssueKey: execKey, testIssueKey: testKey } });

export const getRun = (runId) => jira(`/rest/raven/1.0/api/testrun/${runId}`);

export const setRunStatus = (runId, status) =>
  jira(`/rest/raven/1.0/api/testrun/${runId}/status`, { method: 'PUT', query: { status } });

/**
 * Set the run comment. Xray Server returns {raw, rendered} on GET but the PUT
 * shape is undocumented here, so try plain text first and fall back to JSON.
 */
/**
 * Set a test run's comment.
 *
 * Xray Server stores the request body verbatim as the comment text, but answers
 * text/plain with 415 — so send the raw text under an application/json content type.
 * Do NOT wrap it as {raw: text}: that JSON gets stored literally, braces and all.
 */
export async function setRunComment(runId, text) {
  return jira(`/rest/raven/1.0/api/testrun/${runId}/comment`, {
    method: 'PUT', body: text, contentType: 'application/json', raw: true,
  });
}

/** Upload evidence to a run. Body shape per Xray Server: {data(base64), filename, contentType}. */
export const addRunEvidence = (runId, { data, filename, contentType }) =>
  jira(`/rest/raven/1.0/api/testrun/${runId}/attachment`, {
    method: 'POST', body: { data, filename, contentType },
  });

/**
 * Attach a file to an issue itself (not to a test run).
 * Jira Server needs multipart/form-data plus the XSRF opt-out header.
 */
export function addIssueAttachment(issueKey, { buffer, filename, contentType }) {
  const boundary = `----qa${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
  const head = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
    `Content-Type: ${contentType}\r\n\r\n`, 'utf8');
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');
  return jira(`/rest/api/2/issue/${issueKey}/attachments`, {
    method: 'POST',
    body: Buffer.concat([head, buffer, tail]),
    contentType: `multipart/form-data; boundary=${boundary}`,
    extraHeaders: { 'X-Atlassian-Token': 'no-check' },
  });
}

export const deleteRunEvidence = (runId, attachmentId) =>
  jira(`/rest/raven/1.0/api/testrun/${runId}/attachment/${attachmentId}`, { method: 'DELETE', raw: true });

/** Download an evidence file (follows Jira's redirect) and return its bytes. */
export const downloadEvidence = (fileURL) => jira(fileURL, { binary: true });

/** Remove an issue link by its id (see /rest/api/2/issue/<KEY>?fields=issuelinks). */
export const deleteIssueLink = (linkId) =>
  jira(`/rest/api/2/issueLink/${linkId}`, { method: 'DELETE', raw: true });

/** Issue links of an issue, flattened to {id, type, other, direction}. */
export async function getIssueLinks(key) {
  const j = await jira(`/rest/api/2/issue/${key}`, { query: { fields: 'issuelinks' } });
  return (j.fields.issuelinks || []).map((l) => ({
    id: l.id,
    type: l.type.name,
    // When the viewed issue is the outward side, the stored inwardIssue is the other one.
    other: (l.inwardIssue || l.outwardIssue)?.key,
    label: l.inwardIssue ? l.type.inward : l.type.outward,
  }));
}
