#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDocumentContent } from './lib/doc-validation.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { base, paths, lang, retired = [] } = JSON.parse(await readFile(path.join(root, 'sources.json'), 'utf8'));
  const index = await readFile(path.join(root, 'INDEX.md'), 'utf8');
  const failures = [];
  if (new Set(paths).size !== paths.length) failures.push('sources.json: duplicate source paths');
  for (const source of retired) {
    if (paths.includes(source.path)) failures.push(`sources.json: retired source is still active: ${source.path}`);
  }
  const expectedFiles = new Set(paths.map(p => `${p.replace(/^\//, '').replaceAll('/', '__') || 'index'}.md`));
  for (const file of await readdir(path.join(root, 'docs'))) {
    if (file.endsWith('.md') && !expectedFiles.has(file)) failures.push(`docs/${file}: document is not listed in sources.json`);
  }
  const entries = [...index.matchAll(/^- \[([\s\S]*?)\]\(\.\/docs\/([^\n)]+)\.md\) — `([^`]+)`/gm)];
  if (entries.length !== paths.length || !index.includes(`> 共 ${paths.length} 篇`)) {
    failures.push('INDEX.md: document count does not match sources.json');
  }

  for (const sourcePath of paths) {
    try {
      const slug = sourcePath.replace(/^\//, '').replaceAll('/', '__') || 'index';
      const markdown = await readFile(path.join(root, 'docs', `${slug}.md`), 'utf8');
      const front = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
      if (!front) throw new Error('missing document metadata');
      const fields = Object.fromEntries(front[1].split(/\r?\n/).map(line => {
        const colon = line.indexOf(':');
        return [line.slice(0, colon), line.slice(colon + 1).trim()];
      }));
      if (fields.path !== sourcePath || fields.slug !== slug || fields.source !== `${base}${sourcePath}?hl=${lang}`) {
        throw new Error('source metadata does not match sources.json');
      }
      const title = JSON.parse(fields.title);
      validateDocumentContent({ path: sourcePath, title, markdown: markdown.slice(front[0].length) });
      const matches = entries.filter(entry => entry[2] === slug && entry[3] === sourcePath && entry[1] === title);
      if (matches.length !== 1) throw new Error('INDEX.md: missing, duplicate or mismatched title/path');
    } catch (error) {
      failures.push(`${sourcePath}: ${error.message}`);
    }
  }
  if (failures.length) throw new Error(`Document validation failed:\n${failures.map(f => `  ${f}`).join('\n')}`);
  console.log(`Validated ${paths.length} documents and INDEX.md.`);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
