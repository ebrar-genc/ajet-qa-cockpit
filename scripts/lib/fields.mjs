// Custom field map for jira.thy.com, discovered from /rest/api/2/field.
// Keep this in sync with docs/jira-map.md.

export const FIELDS = {
  // --- Xray ---
  testType:          'customfield_18805', // Manual | Cucumber | Generic
  cucumberTestType:  'customfield_18806', // Scenario | Scenario Outline
  cucumberScenario:  'customfield_18807', // Gherkin body  <-- the BDD bridge
  genericTestDef:    'customfield_18808',
  manualSteps:       'customfield_18809',
  requirementStatus: 'customfield_18827',
  // --- THY / AJet process ---
  testLayer:         'customfield_23131', // Component | API | End to End
  scenarioType:      'customfield_28801', // Positive | Negative | Edge Case | Boundary Value
  testRunType:       'customfield_21103', // e.g. Otomasyon
  channel:           'customfield_21102', // WEB-Desktop | Mobil-Android | ...
  module:            'customfield_21116', // Modul / Sub Modul
  automation:        'customfield_20143', // Otomasyon
  process:           'customfield_20509',
  bugType:           'customfield_11953', // Bug uzerinde zorunlu — ornek deger: Test
  qaProcess:         'customfield_22107', // Regresyon Testi
  qaOrigin:          'customfield_22029', // Manuel Test
  parentLink:        'customfield_21001', // Parent Link — ornek: FT-30992
  team:              'customfield_20403', // Team (option)
  severity:          'customfield_12601', // Projede tek deger kullaniliyor: S3 - Major
  relatedExec:       'customfield_22758', // Related Test Execution
  completedPct:      'customfield_20254',
};

/** customfield_18807 -> cucumberScenario */
export const BY_ID = Object.fromEntries(Object.entries(FIELDS).map(([k, v]) => [v, k]));

/** Field list for a Test issue: the ones that actually carry meaning. */
export const TEST_FIELDS = [
  'key', 'summary', 'status', 'issuetype', 'assignee', 'reporter', 'updated', 'created',
  'labels', 'components', 'issuelinks', 'description', 'priority',
  FIELDS.testType, FIELDS.cucumberTestType, FIELDS.cucumberScenario, FIELDS.manualSteps,
  FIELDS.channel, FIELDS.module, FIELDS.testRunType, FIELDS.automation,
  FIELDS.testLayer, FIELDS.scenarioType,
];

/**
 * Allowed values for the three metadata fields a functional Test issue must carry.
 * Discovered from AJETPSSD on 2026-11-17 by counting live issues per value.
 * Xray's generic 'None' option is NOT configured in this project — Jira rejects it.
 */
export const TEST_META = {
  testLayer:    ['Component', 'API', 'End to End'],
  scenarioType: ['Positive', 'Negative', 'Edge Case', 'Boundary Value'],
  priority:     ['Critical', 'High', 'Medium', 'Low'],
  /** Combinations that must never ship together. */
  forbidden: [{ scenarioType: 'Boundary Value', testLayer: 'End to End' }],
};

/** Summary prefix per channel: "WEB - Bundle Upgrade | ...". */
export const CHANNEL_PREFIX = {
  'WEB-Desktop':    'WEB',
  'Mobil-IOS':      'IOS',
  'Mobil-Android':  'AND',
  'Responsive-IOS': 'RWEB',
  'API-Web':        'APIW',
  'API-Mobil':      'APIM',
};

export const PROJECTS = {
  tests:        'AJETPSSD', // Xray test repository (Test, Test Set, Pre-Condition)
  executions:   'AJPSST',   // Test Execution / Test Plan
  requirements: 'DIJITALTP',// Story / requirement
};

/** Test issue workflow, in BDD-first order. */
export const TEST_STATUSES = [
  'Waiting For BDD', 'BDD Review', 'Non Automated', 'Automated', 'Automation Review',
  'Development', 'Development Done', 'Review Done', 'Update Pending', 'Update Review',
  'Manual', 'Backlog', 'Cancelled', 'Rejected',
];

/** Unwrap Jira's {value|name|displayName} option objects into plain strings. */
export function val(v) {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return v.map(val).filter(Boolean);
  if (typeof v === 'object') return v.value ?? v.name ?? v.displayName ?? v.key ?? null;
  return v;
}

const NOISE = /^TimeInStatus\(/;

/**
 * Strip the ~90 TimeInStatus custom fields and empty values, and rename known
 * custom fields to readable keys. Turns a 99-field issue into ~15 useful ones.
 */
export function clean(fields) {
  const out = {};
  for (const [k, v] of Object.entries(fields || {})) {
    if (v === null || v === undefined || v === '' || (Array.isArray(v) && !v.length)) continue;
    if (typeof v === 'string' && NOISE.test(v)) continue;
    const name = BY_ID[k];
    if (name) out[name] = val(v);
    else if (!k.startsWith('customfield_')) out[k] = val(v);
  }
  return out;
}
