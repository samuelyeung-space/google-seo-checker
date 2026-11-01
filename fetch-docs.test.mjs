import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const repo = path.dirname(fileURLToPath(import.meta.url));
const FAQ = '/search/docs/appearance/structured-data/faqpage';
const SXG = '/search/docs/appearance/signed-exchange';
const GUIDE = '/search/docs/fundamentals/seo-starter-guide';
const DOCS_HOME = '/search/docs';
const slug = p => p.slice(1).replaceAll('/', '__');
const titles = { [FAQ]: 'FAQ（FAQPage、Question、Answer）结构化数据', [SXG]: '开始在 Google 搜索中使用 Signed Exchange', [GUIDE]: '搜索引擎优化 (SEO) 入门指南' };
const bodies = {
  [FAQ]: 'Use FAQPage for a page with frequently asked questions. Each Question has an acceptedAnswer of type Answer. Include the full question and answer text and make this content visible to visitors. Validate the structured data before publishing and inspect the page to check eligibility.',
  [SXG]: 'Signed Exchange (SXG) lets a browser authenticate content served by a cache. Configure your certificate and HTTP headers before enabling signed exchanges. Test the generated package and inspect the cache response to confirm the signature is valid and the browser can display the publisher URL.',
  [GUIDE]: 'Help search engines discover and understand your pages. Use descriptive titles and useful text. Organize the site with crawlable links, and provide important information in a way that visitors can understand. Check that the content can be accessed and that each page serves a clear purpose.',
};
titles[DOCS_HOME] = '浏览 Google 搜索文档，改善网站的 SEO 效果';
bodies[DOCS_HOME] = bodies[GUIDE];
const updates = 'The latest documentation updates mention FAQPage, Question, Answer, Signed Exchange and SXG. These are entries in a chronological change log, with links to other documentation pages. This is a generic updates page and contains no topic-specific instructions for implementing the requested feature.';

function html(p, { title = titles[p], body = bodies[p], canonical = p } = {}) {
  return `<html><head><link href="${canonical}?hl=zh-cn" rel="canonical"><title>${title}</title></head><body><article class="devsite-article"><h1>${title}</h1><p>${body}</p></article></body></html>`;
}

async function run(file, cwd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [file, ...args], { cwd });
    let stdout = '', stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => resolve({ code, stdout, stderr }));
  });
}

async function withRefresh(paths, respond, check, { cached = null, force = true } = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'seo-docs-test-'));
  const server = createServer((req, res) => respond(new URL(req.url, 'http://localhost'), res));
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    await cp(path.join(repo, 'fetch-docs.mjs'), path.join(root, 'fetch-docs.mjs'));
    await cp(path.join(repo, 'lib'), path.join(root, 'lib'), { recursive: true });
    await mkdir(path.join(root, 'docs'));
    await mkdir(path.join(root, 'raw'));
    await writeFile(path.join(root, 'sources.json'), JSON.stringify({ base, lang: 'zh_CN', paths }));
    const before = new Map([['INDEX.md', 'previous complete index\n']]);
    for (const p of paths) {
      before.set(`docs/${slug(p)}.md`, `previous known-good ${p}\n`);
      before.set(`raw/${slug(p)}.html`, cached ?? html(p));
    }
    for (const [name, content] of before) await writeFile(path.join(root, name), content);
    const result = await run('fetch-docs.mjs', root, force ? ['--force'] : []);
    await check({ root, base, result, before });
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
}

async function unchanged({ root, result, before }, rejectedPath) {
  assert.notEqual(result.code, 0, `invalid refresh succeeded: ${result.stdout}`);
  assert.ok(result.stderr.includes(rejectedPath), `missing failed source: ${result.stderr}`);
  for (const [name, content] of before) assert.equal(await readFile(path.join(root, name), 'utf8'), content, `${name} was overwritten`);
}

for (const p of [FAQ, SXG]) {
  test(`${p}: rejects redirect to updates and preserves the entire batch`, async () => {
    await withRefresh([GUIDE, p], (url, res) => {
      if (url.pathname === p) { res.writeHead(302, { location: '/search/updates?hl=zh_CN' }); res.end(); }
      else res.end(url.pathname === GUIDE ? html(GUIDE) : html(p, { title: '最新文档更新', body: updates, canonical: '/search/updates' }));
    }, context => unchanged(context, p));
  });

  test(`${p}: rejects a same-URL updates page even when the topic is mentioned`, async () => {
    await withRefresh([p], (_url, res) => res.end(html(p, { title: '最新文档更新', body: updates })), context => unchanged(context, p));
  });

  test(`${p}: rejects a matching title with unrelated body`, async () => {
    await withRefresh([p], (_url, res) => res.end(html(p, { body: bodies[GUIDE] })), context => unchanged(context, p));
  });
}

test('rejects a different canonical URL despite a correct title and response URL', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ, { canonical: '/search/updates' })), context => unchanged(context, FAQ));
});

test('rejects missing article content without replacing existing files', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(`<h1>${titles[FAQ]}</h1><p>${bodies[FAQ]}</p>`), context => unchanged(context, FAQ));
});

test('rejects an empty article', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ, { body: '' })), context => unchanged(context, FAQ));
});

test('rejects missing canonical identity', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ).replace(/<link[^>]+>/, '')), context => unchanged(context, FAQ));
});

test('rejects a page without an article heading instead of falling back to the site title', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ).replace(/<h1>[\s\S]*?<\/h1>/, '')), context => unchanged(context, FAQ));
});

test('accepts the documentation landing page with its google-seo H2 instead of an H1', async () => {
  await withRefresh([DOCS_HOME], (_url, res) => res.end(html(DOCS_HOME).replace('<h1>', '<h2 id="google-seo">').replace('</h1>', '</h2>')), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const md = await readFile(path.join(root, 'docs', `${slug(DOCS_HOME)}.md`), 'utf8');
    assert.ok(md.includes(titles[DOCS_HOME]));
    assert.ok(md.includes(bodies[DOCS_HOME]));
  });
});

test('landing page heading compatibility still rejects generic updates content', async () => {
  await withRefresh([DOCS_HOME], (_url, res) => res.end(html(DOCS_HOME, { title: '最新文档更新', body: updates }).replace('<h1>', '<h2 id="google-seo">').replace('</h1>', '</h2>')), context => unchanged(context, DOCS_HOME));
});

test('does not accept an arbitrary H2 as the documentation landing page heading', async () => {
  await withRefresh([DOCS_HOME], (_url, res) => res.end(html(DOCS_HOME).replace('<h1>', '<h2 id="other">').replace('</h1>', '</h2>')), context => unchanged(context, DOCS_HOME));
});

test('does not count footer text as topic evidence', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ, { body: bodies[GUIDE] }).replace('</body>', `<footer>${bodies[FAQ]}</footer></body>`)), context => unchanged(context, FAQ));
});

test('preserves the document license and updated date outside the article', async () => {
  const footer = '<devsite-content-footer><p>Content: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p><p>Last updated 2026-09-15 UTC.</p></devsite-content-footer>';
  await withRefresh([GUIDE], (_url, res) => res.end(html(GUIDE).replace('</body>', `${footer}</body>`)), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const md = await readFile(path.join(root, 'docs', `${slug(GUIDE)}.md`), 'utf8');
    assert.ok(md.includes('[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'));
    assert.ok(md.includes('Last updated 2026-09-15 UTC.'));
  });
});

test('document footer cannot supply missing article topic evidence', async () => {
  await withRefresh([FAQ], (_url, res) => res.end(html(FAQ, { body: bodies[GUIDE] }).replace('</body>', `<devsite-content-footer>${bodies[FAQ]}</devsite-content-footer></body>`)), context => unchanged(context, FAQ));
});

test('nested code-tab articles retain the entire outer article without unrelated following content', async () => {
  const between = 'Implementation guidance between the code examples remains part of the documentation.';
  const after = 'Required properties and content guidelines after all code tabs must remain available to readers.';
  const firstExample = 'First code tab example';
  const secondExample = 'Second code tab example';
  const unrelated = 'Unrelated article after the documentation';
  const footer = 'Site footer after the documentation';
  const page = html(GUIDE).replace('</article>', `<article class="code-tab"><p>${firstExample}</p></article><p>${between}</p><article class="code-tab"><p>${secondExample}</p></article><h2>Content guidelines</h2><p>${after}</p></article><article><p>${unrelated}</p></article><footer>${footer}</footer>`);
  await withRefresh([GUIDE], (_url, res) => res.end(page), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const markdown = await readFile(path.join(root, 'docs', `${slug(GUIDE)}.md`), 'utf8');
    for (const content of [bodies[GUIDE], firstExample, between, secondExample, after]) {
      assert.ok(markdown.includes(content), `outer article lost content: ${content}`);
    }
    for (const content of [unrelated, footer]) {
      assert.ok(!markdown.includes(content), `included content outside the outer article: ${content}`);
    }
  });
});

test('rejects a missing outer article close despite closed nested articles and preserves the batch', async () => {
  const incomplete = html(FAQ).replace('</article>', '<article class="code-tab"><p>Nested code example</p></article>');
  await withRefresh([GUIDE, FAQ], (url, res) => res.end(url.pathname === FAQ ? incomplete : html(GUIDE)), context => unchanged(context, FAQ));
});

test('validates old raw cache before re-extraction', async () => {
  await withRefresh([FAQ], (_url, res) => { res.statusCode = 500; res.end(); }, context => unchanged(context, FAQ), { cached: html(FAQ, { title: '最新文档更新', body: updates, canonical: '/search/updates' }), force: false });
});

test('accepts valid cached documents without a network request', async () => {
  await withRefresh([FAQ, SXG], (_url, res) => { res.statusCode = 500; res.end(); }, async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const md = await readFile(path.join(root, 'docs', `${slug(FAQ)}.md`), 'utf8');
    assert.ok(md.includes(bodies[FAQ]));
  }, { force: false });
});

test('HTTP errors fail the batch without partial docs, cache or index writes', async () => {
  await withRefresh([GUIDE, FAQ], (url, res) => {
    if (url.pathname === FAQ) { res.statusCode = 404; res.end('Not found'); }
    else res.end(html(GUIDE));
  }, context => unchanged(context, FAQ));
});

test('accepts correct documents and harmless locale query redirects', async () => {
  await withRefresh([FAQ, SXG, GUIDE], (url, res) => {
    if (url.searchParams.get('hl') === 'zh_CN') { res.writeHead(302, { location: `${url.pathname}?hl=zh-cn` }); res.end(); }
    else res.end(html(url.pathname));
  }, async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    for (const p of [FAQ, SXG, GUIDE]) {
      const md = await readFile(path.join(root, 'docs', `${slug(p)}.md`), 'utf8');
      assert.ok(md.includes(titles[p]));
      assert.ok(md.includes(bodies[p]));
    }
    const index = await readFile(path.join(root, 'INDEX.md'), 'utf8');
    assert.ok(index.includes('共 3 篇'));
    assert.ok(index.includes(titles[FAQ]) && index.includes(titles[SXG]));
  });
});

test('repeated identical full refresh preserves INDEX.md bytes and date', async () => {
  await withRefresh([FAQ, SXG, GUIDE], (url, res) => res.end(html(url.pathname)), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const indexFile = path.join(root, 'INDEX.md');
    const index = (await readFile(indexFile, 'utf8')).replace(/^> 最后抓取: .*$/m, '> 最后抓取: 2020-01-01T00:00:00.000Z');
    await writeFile(indexFile, index);
    const documents = await Promise.all([FAQ, SXG, GUIDE].map(p => readFile(path.join(root, 'docs', `${slug(p)}.md`), 'utf8')));
    for (let refresh = 0; refresh < 2; refresh++) {
      const rerun = await run('fetch-docs.mjs', root, ['--force']);
      assert.equal(rerun.code, 0, rerun.stderr);
      assert.equal(await readFile(indexFile, 'utf8'), index, 'unchanged documents created an index-only update');
      for (const [i, p] of [FAQ, SXG, GUIDE].entries()) {
        assert.equal(await readFile(path.join(root, 'docs', `${slug(p)}.md`), 'utf8'), documents[i]);
      }
    }
  });
});

test('body-only change with the same title updates the document and INDEX.md date', async () => {
  let body = bodies[GUIDE];
  await withRefresh([GUIDE], (_url, res) => res.end(html(GUIDE, { body })), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const indexFile = path.join(root, 'INDEX.md');
    const index = (await readFile(indexFile, 'utf8')).replace(/^> 最后抓取: .*$/m, '> 最后抓取: 2020-01-01T00:00:00.000Z');
    await writeFile(indexFile, index);
    body += ' Review the page after changing its main content and update descriptive headings when needed.';
    const rerun = await run('fetch-docs.mjs', root, ['--force']);
    assert.equal(rerun.code, 0, rerun.stderr);
    const document = await readFile(path.join(root, 'docs', `${slug(GUIDE)}.md`), 'utf8');
    assert.ok(document.includes(body));
    assert.ok(document.includes(`title: ${JSON.stringify(titles[GUIDE])}`));
    const refreshedIndex = await readFile(indexFile, 'utf8');
    assert.notEqual(refreshedIndex, index, 'body changes must advance the index date');
    assert.equal(refreshedIndex.replace(/^> 最后抓取: .*$/m, ''), index.replace(/^> 最后抓取: .*$/m, ''));
    assert.ok(Date.parse(refreshedIndex.match(/^> 最后抓取: (.+)$/m)[1]) > Date.parse('2020-01-01T00:00:00.000Z'));
  });
});

test('unchanged documents still repair a corrupted index and advance its date', async () => {
  await withRefresh([GUIDE], (_url, res) => res.end(html(GUIDE)), async ({ root, result }) => {
    assert.equal(result.code, 0, result.stderr);
    const indexFile = path.join(root, 'INDEX.md');
    const correctIndex = await readFile(indexFile, 'utf8');
    const corruptedIndex = correctIndex.replace(titles[GUIDE], 'Wrong document title').replace(/^> 最后抓取: .*$/m, '> 最后抓取: 2020-01-01T00:00:00.000Z');
    await writeFile(indexFile, corruptedIndex);
    const rerun = await run('fetch-docs.mjs', root, ['--force']);
    assert.equal(rerun.code, 0, rerun.stderr);
    const repairedIndex = await readFile(indexFile, 'utf8');
    assert.equal(repairedIndex.replace(/^> 最后抓取: .*$/m, ''), correctIndex.replace(/^> 最后抓取: .*$/m, ''));
    assert.ok(!repairedIndex.includes('2020-01-01T00:00:00.000Z'));
  });
});

async function withCorpus(change, check) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'seo-corpus-test-'));
  try {
    await cp(path.join(repo, 'validate-docs.mjs'), path.join(root, 'validate-docs.mjs'));
    await cp(path.join(repo, 'lib'), path.join(root, 'lib'), { recursive: true });
    await mkdir(path.join(root, 'docs'));
    await writeFile(path.join(root, 'sources.json'), JSON.stringify({ base: 'https://developers.google.com', lang: 'zh_CN', paths: [FAQ, SXG] }));
    for (const p of [FAQ, SXG]) {
      const markdown = `---\ntitle: ${JSON.stringify(titles[p])}\nsource: https://developers.google.com${p}?hl=zh_CN\nslug: ${slug(p)}\npath: ${p}\n---\n\n# ${titles[p]}\n\n${bodies[p]}\n`;
      await writeFile(path.join(root, 'docs', `${slug(p)}.md`), markdown);
    }
    await writeFile(path.join(root, 'INDEX.md'), `# Google Search SEO 文档索引\n\n> 共 2 篇\n\n${[FAQ, SXG].map(p => `- [${titles[p]}](./docs/${slug(p)}.md) — \`${p}\``).join('\n')}\n`);
    await change(root);
    await check(await run('validate-docs.mjs', root));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('offline corpus check accepts known-good FAQ and Signed Exchange documents', async () => {
  await withCorpus(async () => {}, result => assert.equal(result.code, 0, result.stderr));
});

for (const p of [FAQ, SXG]) {
  test(`offline corpus check rejects the updates body stored under ${p}`, async () => {
    await withCorpus(async root => {
      const file = path.join(root, 'docs', `${slug(p)}.md`);
      const md = await readFile(file, 'utf8');
      const metadata = md.slice(0, md.indexOf('\n---', 4) + 4).replace(JSON.stringify(titles[p]), '"最新文档更新"');
      await writeFile(file, `${metadata}\n\n# 最新文档更新\n\n${updates}\n`);
    }, result => {
      assert.notEqual(result.code, 0);
      assert.ok(result.stderr.includes(p), result.stderr);
    });
  });
}

test('offline corpus check rejects missing listed documents', async () => {
  await withCorpus(root => rm(path.join(root, 'docs', `${slug(FAQ)}.md`)), result => {
    assert.notEqual(result.code, 0);
    assert.ok(result.stderr.includes(FAQ), result.stderr);
  });
});

test('offline corpus check rejects an orphan Markdown document not listed in sources', async () => {
  const orphan = 'unlisted-document.md';
  await withCorpus(root => writeFile(path.join(root, 'docs', orphan), '# Unlisted document\n\n' + bodies[GUIDE]), result => {
    assert.notEqual(result.code, 0, 'orphan document was accepted');
    assert.ok(result.stderr.includes(orphan), result.stderr);
  });
});

test('offline corpus check rejects a retired path that is still active', async () => {
  await withCorpus(async root => {
    const file = path.join(root, 'sources.json');
    const sources = JSON.parse(await readFile(file, 'utf8'));
    sources.retired = [{ path: FAQ, reason: 'Official documentation was removed.', evidence: 'https://developers.google.com/search/updates' }];
    await writeFile(file, JSON.stringify(sources));
  }, result => {
    assert.notEqual(result.code, 0, 'retired source remained active');
    assert.ok(result.stderr.includes(FAQ), result.stderr);
  });
});

test('offline corpus check rejects an index with a wrong title', async () => {
  await withCorpus(async root => {
    const file = path.join(root, 'INDEX.md');
    await writeFile(file, (await readFile(file, 'utf8')).replace(titles[FAQ], '最新文档更新'));
  }, result => {
    assert.notEqual(result.code, 0);
    assert.ok(result.stderr.includes('INDEX.md'), result.stderr);
  });
});
