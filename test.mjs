// Offline smoke tests plus focused rule regressions through the public API.
// Fixtures exercise HTML/JSON-LD parsing and the resulting rule statuses.
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

    async function checkFixture(name, head, ruleId, expectedStatus, expectedMessage) {
      const file = path.join(tmp, `${name}.html`);
      await writeFile(file, `<!doctype html><html><head>${head}</head><body><h1>Example</h1></body></html>`);
      const report = await check(file);
      const result = report.results.find(r => r.id === ruleId);
      assert(result?.status === expectedStatus && report.summary.error === 0,
        `${name}: ${ruleId} expected ${expectedStatus}, got ${result?.status} (${report.summary.error} rule errors)`);
      if (expectedMessage) assert(result.message === expectedMessage, `${name}: reports the blocking meta tag`);
    }

    console.log('\n4. Robots and Googlebot meta regressions');
    // https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
    // Negative rules combine across tags; names/values ignore case; none = noindex,nofollow.
    const robotsCases = [
      ['robots-noindex', '<meta name="robots" content="noindex">', 'fail'],
      ['later-robots-noindex', '<meta name="robots" content="index"><meta name="robots" content="noindex">', 'fail'],
      ['earlier-robots-noindex', '<meta name="robots" content="noindex"><meta name="robots" content="index">', 'fail'],
      ['googlebot-noindex', '<meta name="googlebot" content="noindex">', 'fail', '<meta name="googlebot" content="noindex">'],
      ['googlebot-overrides-index', '<meta name="robots" content="index"><meta name="googlebot" content="noindex">', 'fail'],
      ['robots-overrides-index', '<meta name="robots" content="noindex"><meta name="googlebot" content="index">', 'fail'],
      ['later-googlebot-noindex', '<meta name="googlebot" content="index"><meta name="googlebot" content="noindex">', 'fail'],
      ['mixed-case-robots', '<META NAME="RoBoTs" CONTENT="follow, NoInDeX">', 'fail'],
      ['mixed-case-googlebot', '<META NAME="GoOgLeBoT" CONTENT="NoInDeX, FOLLOW">', 'fail'],
      ['robots-none', '<meta name="robots" content="none">', 'fail'],
      ['googlebot-none', '<meta name="googlebot" content="NoNe">', 'fail'],
      ['image-preview-none', '<meta name="robots" content="max-image-preview: none, index">', 'pass'],
      ['other-crawler', '<meta name="bingbot" content="noindex">', 'pass'],
      ['news-only-crawler', '<meta name="googlebot-news" content="noindex">', 'pass'],
      ['directive-substring', '<meta name="robots" content="noindexing">', 'pass'],
      ['indexing-allowed', '<meta name="robots" content="index, nofollow"><meta name="googlebot">', 'pass'],
    ];
    for (const [name, head, expectedStatus, expectedMessage] of robotsCases) {
      await checkFixture(name, head, 'no-noindex', expectedStatus, expectedMessage);
    }
    const headerResult = RULES.find(r => r.id === 'no-noindex').check({
      metas: [], headers: { 'x-robots-tag': 'NOINDEX' },
    });
    assert(headerResult.status === 'fail', 'existing X-Robots-Tag noindex detection is preserved');

    console.log('\n5. Product offer price regressions');
    // Google explicitly shows price: 0 for products available without payment:
    // https://developers.google.com/search/docs/appearance/structured-data/product-snippet#offer-details
    const offer = values => ({ '@type': 'Offer', priceCurrency: 'USD', ...values });
    const productCases = [
      ['zero-price', offer({ price: 0 }), 'pass'],
      ['string-zero-price', offer({ price: '0' }), 'pass'],
      ['positive-price', offer({ price: 9.99 }), 'pass'],
      ['nested-zero-price', offer({ priceSpecification: { '@type': 'PriceSpecification', price: 0 } }), 'pass'],
      ['offers-array-zero', [offer({ price: 0 }), offer({ price: 9.99 })], 'pass'],
      ['missing-price', offer({}), 'fail'],
      ['null-price', offer({ price: null }), 'fail'],
      ['empty-price', offer({ price: '' }), 'fail'],
      ['false-price', offer({ price: false }), 'fail'],
      ['nested-empty-price', offer({ priceSpecification: { '@type': 'PriceSpecification', price: '' } }), 'fail'],
      ['zero-without-currency', offer({ price: 0, priceCurrency: undefined }), 'fail'],
      ['offers-array-missing-price', [offer({ price: 0 }), offer({})], 'fail'],
      ['missing-offers', undefined, 'fail'],
    ];
    for (const [name, offers, expectedStatus] of productCases) {
      const product = { '@context': 'https://schema.org', '@type': 'Product', name: 'Example product', offers };
      const head = `<script type="application/ld+json">${JSON.stringify(product)}</script>`;
      await checkFixture(name, head, 'jsonld-product-offers', expectedStatus);
    }
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }

  console.log('\nAll tests passed.');
}

main().catch(e => { console.error(e); process.exit(1); });
