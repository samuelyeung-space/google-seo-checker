# google-seo-checker

> **For developers shipping SSR/SSG pages:** audit one HTML page for metadata,
> canonical, robots and structured-data issues, with a source link for each rule.
>
> This is a transparent preflight check, not a ranking guarantee. It does not
> execute JavaScript or crawl a whole site.

English · [中文](./README.md)

## Try the checker from source

Requires **Node.js 18+** and Git. No runtime dependencies or account are needed
for the local example. Use this source checkout; npm installation will be
documented after a verified package release.

```bash
git clone https://github.com/yangyangnovelist-hub/google-seo-checker.git
cd google-seo-checker
node cli.mjs ./examples/quickstart.html --filter=meta,schema --json
```

The intentionally incomplete fixture produces a JSON report with failed rules
and Google documentation links. **Exit code 1 means findings, not an installation
failure**; 2 means a tool error. The report's messages currently use Chinese,
including in JSON. The English guide explains the command and result fields.

Then check your own built HTML, or fetch a public page:

```bash
node cli.mjs ./dist/index.html --json
node cli.mjs https://example.com/ --json
```

Local HTML checks do not fetch robots.txt or sitemaps. Public-URL checks make
network requests; client-rendered content is not executed. See
[limitations](#limitations-no-marketing-fluff) before interpreting findings.

## Why

SEO tooling today is roughly:

1. **Lighthouse / PageSpeed** — strong on Core Web Vitals, weak on schema / canonical / robots / spam policies
2. **Screaming Frog / Ahrefs / Semrush** — commercial, black-box rules, overkill for small projects

Meanwhile the actual ground truth — [developers.google.com/search/docs](https://developers.google.com/search/docs) — is 152 pages most engineers never read end-to-end.

This tool's job: **turn the machine-checkable parts of those 152 pages into if-statements**, each linked back to its source doc.

## Install the optional CLI aliases

After cloning the source above, run `npm link` from the repository directory
to make `seo-check` and `seo-lookup` available locally as CLI aliases. This
links your checkout; it does not download a published package.

```bash
npm link
seo-check ./examples/quickstart.html --filter=meta,schema --json
```

To remove those aliases later: `npm unlink -g google-seo-checker`.
You can keep using `node cli.mjs` and `node lookup.mjs` without linking.

## Three entry points

### 1. `seo-check` — audit a single page

```bash
seo-check https://example.com/                  # URL
seo-check ./dist/index.html                     # local file
seo-check https://example.com/ --quiet          # only fail/warn
seo-check https://example.com/ --json           # machine-readable
seo-check https://example.com/ --filter=schema  # one category
seo-check https://example.com/ --fail-on=warn   # CI: warn blocks
seo-check https://example.com/ --no-sitemap     # skip sitemap fetch
```

Exit code: `0` = no fails; `1` = at least one fail (or threshold met via `--fail-on`); `2` = tool error.

### 2. `seo-lookup` — query the Google docs

```bash
seo-lookup canonical                            # single term
seo-lookup hreflang self-reference x-default    # multi-term (AND-weighted)
seo-lookup robots --section=crawling-indexing   # filter by section
seo-lookup "Product offers" --titles            # titles only
seo-lookup canonical --json | jq                # JSON output
```

Returns docs ranked by score, with matching excerpts (keywords highlighted) and source URLs.

### 3. As a JS library

```js
import { check } from 'google-seo-checker';
import { RULES, CATEGORIES } from 'google-seo-checker/rules';

const result = await check('https://example.com/');

console.log(result.summary);  // { pass: 49, warn: 9, fail: 1, skip: 6 }

for (const r of result.results) {
  if (r.status === 'fail') {
    console.log(r.id, '→', r.message, '\n   ', r.source);
  }
}
```

## What 65 rules cover

| Category | Examples |
|---|---|
| `crawl` (8) | HTTPS, 200 status, robots.txt presence/permission/CSS-JS access, sitemap, mixed-content |
| `index` (8) | noindex, canonical (present/absolute/same-origin), robots-meta vs X-Robots-Tag conflict, rel=next/prev, amphtml |
| `meta` (10) | title, description (50-160), charset, viewport, html lang, favicon, snippet directives |
| `headings` (3) | h1 present / single / no level skips |
| `images` (5) | alt, width/height (CLS), lazy, generic filenames (IMG_1234), modern format |
| `links` (5) | empty anchors, vague text, `javascript:`/`#`, `target=_blank` rel |
| `schema` (10) | JSON-LD validity, @context, Product offers, Article fields, Breadcrumb, Organization, WebSite, SearchAction, date sanity |
| `social` (4) | og:title/description/image/url (and canonical agreement) |
| `i18n` (1) | hreflang self-reference / x-default |
| `content` (2) | title==h1 duplication, body length (auto CJK/Latin) |
| `url` (4) | uppercase, spaces, `-` vs `_`, length |
| `policy` (3) | keyword stuffing (>5% word frequency), hidden text, doorway templates |
| `js` (2) | onclick=window.location, fragment-only routing |
| `perf` (2) | render-blocking head `<script>`, multi-origin without preconnect |

Each rule in [`rules.mjs`](./rules.mjs) looks like:

```js
{
  id: 'jsonld-product-offers',
  category: 'schema',
  severity: 'error',
  title: 'Product must have offers + price + priceCurrency',
  source: 'https://developers.google.com/search/docs/appearance/structured-data/product',
  check: (ctx) => { /* return { status, message?, detail? } */ },
}
```

## Add your own rule

Append to the array in `rules.mjs`:

```js
{
  id: 'twitter-card-summary',
  category: 'social',
  severity: 'info',
  title: 'Twitter card should be summary_large_image',
  source: 'https://developer.x.com/...',
  check: ({ getMetaByName, metas }) => {
    const card = getMetaByName(metas, 'twitter:card');
    return card?.content === 'summary_large_image'
      ? { status: 'pass' }
      : { status: 'warn', message: 'Missing or non-large_image' };
  },
}
```

Full `ctx` shape in [`run.mjs`](./run.mjs).

## As a Claude Code skill

After `npm link`, see [`SKILL.md`](./SKILL.md) and link the local package as a skill:

```bash
mkdir -p ~/.claude/skills/google-seo-checker
ln -s "$(npm root -g)/google-seo-checker"/* ~/.claude/skills/google-seo-checker/
```

Then in Claude Code: "audit example.com's SEO" or "what does Google say about canonical" will route here.

## Limitations (no marketing fluff)

- **Regex HTML parsing**, not a real DOM — malformed HTML or HTML strings inside `<script>` can mislead it
- **No JS execution** — SSR / SSG content is seen; pure client-rendered schema/title is missed
- **Single URL at a time** — no site-wide crawl, no diff, no over-time tracking
- **CWV is surface-level** — only `width/height`, `preconnect`, blocking scripts; real LCP/CLS/INP needs Lighthouse / CrUX
- **Docs are point-in-time** — Google updates aren't auto-synced. Refresh with `npm run fetch-docs -- --force`. CI refreshes monthly.
- **Rules are hand-curated** — the 65 cover what's machine-checkable. E-E-A-T, helpful content, Core Updates need human judgment.

## How it compares

| | google-seo-checker | Lighthouse | Screaming Frog | Ahrefs |
|---|---|---|---|---|
| Price | Free / MIT | Free | $259/yr+ | $99/mo+ |
| Schema / JSON-LD field-level | ✅ 10 rules | ⚠️ basic | ✅ | ⚠️ |
| robots.txt + sitemap | ✅ | ❌ | ✅ | ✅ |
| Spam policies (keyword stuffing / hidden text / doorway) | ✅ 3 rules | ❌ | ⚠️ | ⚠️ |
| Real CWV (LCP/CLS/INP) | ❌ (use Lighthouse) | ✅ | ⚠️ | ✅ |
| Whole-site crawl | ❌ | ❌ | ✅ | ✅ |
| Rule-level source citations | ✅ every rule | ❌ | ❌ | ❌ |
| Lookup Google docs | ✅ | ❌ | ❌ | ❌ |

Niche: **single-page, transparent rules, CI-friendly**. Pair with Lighthouse (perf) + Search Console (gaps).

## Contributing

PRs welcome. Each new rule needs:

1. An entry in `rules.mjs` with a `source` pointing to the Google doc
2. A row in the README rule table
3. Ideally a local fixture in `test-fixtures/` that triggers it

False positives → file an issue with minimal repro. False negatives (should fail but passes) → file an issue with URL + Google doc citation.

## License

MIT — see [LICENSE](./LICENSE).
