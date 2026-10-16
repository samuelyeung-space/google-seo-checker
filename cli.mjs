#!/usr/bin/env node
// SEO checker CLI.
//
//   node cli.mjs <url-or-file> [options]
//
// Options:
//   --json              Emit JSON to stdout (machine-readable)
//   --no-sitemap        Skip sitemap fetches (faster)
//   --no-robots         Skip robots.txt fetch
//   --filter=meta,links Only run rules in these categories
//   --fail-on=warn      Exit with code 1 on warn or worse (default: fail)
//   --quiet             Print only failures + warnings
//
// Exit code: 0 if no failures, 1 if any rule fails (or --fail-on threshold met).

import { check } from './run.mjs';
import { format, formatJson } from './report.mjs';

function parseArgs(argv) {
  const out = { target: null, json: false, robots: true, sitemap: true, filter: null, failOn: 'fail', quiet: false };
  for (const a of argv) {
    if (a === '--json') out.json = true;
    else if (a === '--no-sitemap') out.sitemap = false;
    else if (a === '--no-robots') out.robots = false;
    else if (a === '--quiet') out.quiet = true;
    else if (a.startsWith('--filter=')) out.filter = a.slice('--filter='.length).split(',').map(s => s.trim()).filter(Boolean);
    else if (a.startsWith('--fail-on=')) out.failOn = a.slice('--fail-on='.length);
    else if (a === '-h' || a === '--help') out.help = true;
    else if (!out.target && !a.startsWith('-')) out.target = a;
  }
  return out;
}

function usage() {
  console.log(`SEO Checker — built from Google Search docs

Usage:
  node cli.mjs <url-or-file> [options]
  npm run check -- <url-or-file> [options]

Options:
  --json              Output JSON instead of human report
  --no-sitemap        Skip sitemap fetches
  --no-robots         Skip robots.txt fetch
  --filter=cat,cat    Only run rules in these categories
                      (crawl, index, meta, headings, images, links,
                       schema, social, i18n, content)
  --fail-on=fail|warn Exit non-zero threshold (default: fail)
  --quiet             Only print failures + warnings

Examples:
  seo-check https://example.com/
  seo-check ./dist/index.html --filter=meta,schema
  seo-check https://example.com/ --json > report.json
`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.target) { usage(); process.exit(opts.help ? 0 : 1); }

  const result = await check(opts.target, {
    fetchRobots: opts.robots,
    fetchSitemaps: opts.sitemap,
  });

  if (opts.filter) {
    result.results = result.results.filter(r => opts.filter.includes(r.category));
    result.summary = result.results.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, { pass: 0, warn: 0, fail: 0, skip: 0 });
  }
  if (opts.quiet) {
    result.results = result.results.filter(r => r.status === 'fail' || r.status === 'warn' || r.status === 'error');
  }

  if (opts.json) console.log(formatJson(result));
  else process.stdout.write(format(result));

  const thresholds = { fail: ['fail', 'error'], warn: ['fail', 'warn', 'error'] };
  const blockingStatuses = thresholds[opts.failOn] || thresholds.fail;
  const hit = result.results.some(r => blockingStatuses.includes(r.status));
  process.exit(hit ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(2); });
