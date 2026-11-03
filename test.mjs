// Tiny smoke test. Not a full test suite — just verifies the rule engine
// loads, runs against a hand-built HTML fixture, and produces sensible
// pass/fail counts. Designed to be runnable without network.
//
//   node test.mjs

import { check } from './run.mjs';
import { RULES, CATEGORIES } from './rules.mjs';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function assert(cond, msg) {
  if (!cond) { console.error('FAIL:', msg); process.exit(1); }
  console.log('  ✓', msg);
}

async function main() {
  console.log('1. Rule registry loads');
  assert(Array.isArray(RULES) && RULES.length > 30, `RULES has ${RULES.length} entries (>30)`);
  assert(RULES.every(r => r.id && r.category && r.title && r.source && typeof r.check === 'function'), 'every rule has id/category/title/source/check');
  assert(RULES.every(r => CATEGORIES[r.category]), 'every rule.category is in CATEGORIES');
  const ids = RULES.map(r => r.id);
  assert(new Set(ids).size === ids.length, 'rule ids are unique');

  console.log('\n2. Run against a clean fixture');
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'seo-checker-test-'));
  try {
    const goodHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Test Page — Example Co</title>
<meta name="description" content="A reasonably descriptive meta description that is between fifty and one hundred sixty characters long for the purpose of testing.">
<link rel="canonical" href="https://example.com/">
<link rel="icon" href="/favicon.ico">
<meta property="og:title" content="Test Page">
<meta property="og:description" content="A reasonably descriptive meta description that is long enough to pass the test rule of fifty characters.">
<meta property="og:image" content="https://example.com/og.png">
<meta property="og:url" content="https://example.com/">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"Example Co","url":"https://example.com/"}
</script>
</head>
<body>
<h1>Test Page Title</h1>
<h2>Section</h2>
<p>${'This is a long paragraph of test content. '.repeat(50)}</p>
<img src="hero.webp" alt="Hero image" width="1200" height="600">
<a href="/about">About us</a>
</body>
</html>`;
    const goodFile = path.join(tmp, 'good.html');
    await writeFile(goodFile, goodHtml);
    const goodResult = await check(goodFile);
    console.log('  ', goodResult.summary);
    assert(goodResult.summary.fail === 0, 'clean fixture has 0 fails');
    assert(goodResult.summary.pass > 15, `clean fixture passes >15 rules (got ${goodResult.summary.pass})`);

    console.log('\n3. Run against a broken fixture');
    const badHtml = `<!doctype html>
<html>
<head>
<title></title>
<script type="application/ld+json">{this is not json}</script>
</head>
<body>
<img src="img-1.jpg">
<a href="javascript:void(0)">click here</a>
</body>
</html>`;
    const badFile = path.join(tmp, 'bad.html');
    await writeFile(badFile, badHtml);
    const badResult = await check(badFile);
    console.log('  ', badResult.summary);
    assert(badResult.summary.fail > 0, 'broken fixture produces fails');
    const failIds = badResult.results.filter(r => r.status === 'fail').map(r => r.id);
    assert(failIds.includes('title-present'), 'detects empty <title>');
    assert(failIds.includes('jsonld-valid'), 'detects invalid JSON-LD');
    assert(failIds.includes('img-alt'), 'detects missing alt');
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }

  console.log('\n4. Retired sitelinks search box must not create work');
  const retired = RULES.find(r => r.id === 'jsonld-site-searchaction');
  const home = { pageUrl: 'https://example.com/', jsonLdNodes: [] };
  const scenarios = [
    ['no WebSite markup', []],
    ['WebSite without SearchAction', [{ '@type': 'WebSite', name: 'Example' }]],
    ['existing SearchAction markup', [{ '@type': 'WebSite', potentialAction: { '@type': 'SearchAction' } }]],
  ];
  for (const [label, jsonLdNodes] of scenarios) {
    assert(retired.check({ ...home, jsonLdNodes }).status === 'skip', `${label}: no retired-feature warning or approval`);
  }
  assert(retired.source === 'https://developers.google.com/search/blog/2024/10/sitelinks-search-box', 'retirement points to the official announcement');
  const siteName = RULES.find(r => r.id === 'jsonld-website-name');
  assert(siteName.check({ jsonLdNodes: [{ '@type': 'WebSite' }] }).status === 'warn', 'supported WebSite site-name check still reports a missing name');

  console.log('\nAll tests passed.');
}

main().catch(e => { console.error(e); process.exit(1); });

