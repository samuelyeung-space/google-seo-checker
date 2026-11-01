#!/usr/bin/env node
// Download every page listed in sources.json from developers.google.com,
// extract the <article> body, convert to markdown, and write to docs/.
//
//   node scripts/seo-checker/fetch-docs.mjs
//
// Concurrency is capped to avoid being rate-limited by developers.google.com.
// We keep the raw HTML in raw/ so re-extraction is offline.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateFetchedDocument } from './lib/doc-validation.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const RAW_DIR = path.join(ROOT, 'raw');
const DOCS_DIR = path.join(ROOT, 'docs');

const CONCURRENCY = 6;
const RETRIES = 3;
const UA = 'Mozilla/5.0 (compatible; google-seo-checker/0.1; +https://github.com/yangyangnovelist-hub/google-seo-checker)';

function pathToSlug(p) {
  return p.replace(/^\//, '').replace(/\//g, '__') || 'index';
}

async function fetchWithRetry(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA, 'accept-language': 'zh-CN,zh;q=0.9' },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { html: await res.text(), finalUrl: res.url };
  } catch (err) {
    if (attempt >= RETRIES) throw err;
    await new Promise(r => setTimeout(r, 500 * attempt));
    return fetchWithRetry(url, attempt + 1);
  }
}

async function pool(items, worker, n) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      try { results[i] = await worker(items[i], i); }
      catch (e) { results[i] = { error: `${items[i]}: ${e?.message || String(e)}` }; }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const srcRaw = await readFile(path.join(ROOT, 'sources.json'), 'utf8');
  const { base, paths, lang } = JSON.parse(srcRaw);
  const force = process.argv.includes('--force');
  const total = paths.length;
  let done = 0;

  const results = await pool(paths, async (p) => {
    const slug = pathToSlug(p);
    const rawFile = path.join(RAW_DIR, `${slug}.html`);
    const mdFile = path.join(DOCS_DIR, `${slug}.md`);
    const url = `${base}${p}?hl=${lang}`;

    const cached = !force && existsSync(rawFile);
    const fetched = cached
      ? { html: await readFile(rawFile, 'utf8') }
      : await fetchWithRetry(url);
    const { title, markdown } = validateFetchedDocument({ requestedUrl: url, ...fetched });
    const front = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `source: ${url}`,
      `slug: ${slug}`,
      `path: ${p}`,
      '---',
      '',
      `# ${title}`,
      '',
      `> 来源: ${url}`,
      '',
      markdown,
    ].join('\n');
    done++;
    process.stdout.write(`\r[${done}/${total}] ${p.padEnd(70).slice(0, 70)}`);
    return { slug, title, path: p, rawFile, mdFile, front, html: fetched.html, cached };
  }, CONCURRENCY);

  process.stdout.write('\n');

  const errored = results.filter(r => r?.error);
  if (errored.length) {
    console.warn(`\n${errored.length} failures:`);
    errored.forEach(e => console.warn(`  ${e.error}`));
    throw new Error('Document refresh rejected; no docs, raw cache, or index were written');
  }

  await mkdir(RAW_DIR, { recursive: true });
  await mkdir(DOCS_DIR, { recursive: true });
  for (const result of results) {
    if (!result.cached) await writeFile(result.rawFile, result.html, 'utf8');
    await writeFile(result.mdFile, result.front, 'utf8');
  }
  const tocEntries = results;
  tocEntries.sort((a, b) => a.path.localeCompare(b.path));
  const toc = [
    '# Google Search SEO 文档索引',
    '',
    `> 共 ${tocEntries.length} 篇，来源 developers.google.com/search/docs (hl=${lang})`,
    `> 最后抓取: ${new Date().toISOString()}`,
    '',
    ...tocEntries.map(e => `- [${e.title}](./docs/${e.slug}.md) — \`${e.path}\``),
    '',
  ].join('\n');
  await writeFile(path.join(ROOT, 'INDEX.md'), toc, 'utf8');
  console.log(`\nWrote ${tocEntries.length} markdown files + INDEX.md`);
}

main().catch(err => { console.error(err); process.exit(1); });
