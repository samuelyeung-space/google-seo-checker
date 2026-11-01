import { articleToMarkdown, extractTitle } from './html-to-markdown.mjs';

const FAQ_PATH = '/search/docs/appearance/structured-data/faqpage';
const SXG_PATH = '/search/docs/appearance/signed-exchange';
const GENERIC_TITLE = /^(?:latest\s+(?:documentation\s+)?updates|documentation\s+updates|what[’']?s\s+new|最新(?:文档|文件)?更新|近期更新|404\b.*|page\s+not\s+found|not\s+found|access\s+denied|service\s+unavailable|error(?:\s+\d+)?|找不到(?:网页|页面)|(?:网页|页面)(?:未找到|不存在)|错误)(?:\s*[|—–-].*)?$/i;

function identity(value, base) {
  const url = new URL(value, base);
  url.hash = '';
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  url.searchParams.delete('hl');
  url.searchParams.sort();
  return url.href;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(([, name, double, single, bare]) => [name.toLowerCase(), (double ?? single ?? bare).replace(/&amp;/g, '&')]));
}

function withoutChrome(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|nav|footer)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
}

function extractDevsiteArticle(html) {
  let start = -1;
  let depth = 0;
  for (const match of html.matchAll(/<(\/?)article\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const [, closing, attrs] = match;
    if (start < 0) {
      if (!closing && (attributes(attrs).class || '').split(/\s+/).includes('devsite-article')) {
        start = match.index;
        depth = 1;
      }
      continue;
    }
    depth += closing ? -1 : 1;
    if (depth === 0) return html.slice(start, match.index + match[0].length);
  }
  throw new Error('Missing complete devsite article');
}

function bodyText(markdown) {
  return withoutChrome(markdown)
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/^\s{0,3}#{1,6}\s+.*$/gm, '')
    .replace(/^\s*>\s*(?:来源|Source)\s*:.*$/gmi, '')
    .replace(/^\s*(?:[-*+]\s*)?\[[^\]\n]*\]\([^\n]*\)\s*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validateDocumentContent({ path, title, markdown }) {
  const normalizedTitle = title?.replace(/\s+/g, ' ').trim() || '';
  if ((normalizedTitle.match(/[\p{L}\p{N}]/gu) || []).length < 3) {
    throw new Error('Missing meaningful document title');
  }
  if (GENERIC_TITLE.test(normalizedTitle)) {
    throw new Error(`Generic updates/error document title: ${normalizedTitle}`);
  }
  const body = bodyText(markdown);
  if ((body.match(/[\p{L}\p{N}]/gu) || []).length < 80) {
    throw new Error('Missing substantive article body (at least 80 letters or digits required)');
  }
  if (path.replace(/\/+$/, '') === FAQ_PATH) {
    if (!/\bFAQ(?:Page)?\b|常见问题解答|常見問題解答/i.test(normalizedTitle) ||
        ![ /\bFAQPage\b/i, /\bQuestion\b/i, /\bAnswer\b/i ].every(pattern => pattern.test(body))) {
      throw new Error('FAQPage topic mismatch: expected FAQ title and FAQPage, Question, Answer in the article body');
    }
  }
  if (path.replace(/\/+$/, '') === SXG_PATH) {
    if (!/\bSigned\s+Exchanges?\b|\bSXG\b|签名交换|簽署交換/i.test(normalizedTitle) ||
        ![ /\bSigned\s+Exchanges?\b/i, /\bSXG\b/i ].every(pattern => pattern.test(body))) {
      throw new Error('Signed Exchange topic mismatch: expected Signed Exchange title and Signed Exchange, SXG in the article body');
    }
  }
}

export function validateFetchedDocument({ requestedUrl, finalUrl, html }) {
  const requested = new URL(requestedUrl);
  if (finalUrl !== undefined && identity(finalUrl) !== identity(requestedUrl)) {
    throw new Error(`Unexpected response URL: ${finalUrl}`);
  }
  const cleanHtml = withoutChrome(html);
  const canonicals = [...cleanHtml.matchAll(/<link\b[^>]*>/gi)]
    .map(([tag]) => attributes(tag))
    .filter(attrs => (attrs.rel || '').toLowerCase().split(/\s+/).includes('canonical'));
  if (canonicals.length !== 1 || !canonicals[0].href) {
    throw new Error('Expected exactly one canonical URL');
  }
  if (identity(canonicals[0].href, requestedUrl) !== identity(requestedUrl)) {
    throw new Error(`Unexpected canonical URL: ${canonicals[0].href}`);
  }
  const article = extractDevsiteArticle(cleanHtml);
  let heading = article.match(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/i)?.[1];
  if (heading === undefined && requested.pathname.replace(/\/+$/, '') === '/search/docs') {
    heading = [...article.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2\s*>/gi)]
      .find(([, attrs]) => attributes(attrs).id === 'google-seo')?.[2];
  }
  if (heading === undefined) throw new Error('Missing article H1 or recognized documentation landing-page heading');
  const title = extractTitle(`<h1>${heading}</h1>`);
  const markdown = articleToMarkdown(article);
  validateDocumentContent({ path: requested.pathname, title, markdown });
  // Keep Google's attribution and source update date, without treating the
  // document footer as evidence that the article itself matches the source.
  const footer = cleanHtml.match(/<devsite-content-footer\b[^>]*>[\s\S]*?<\/devsite-content-footer\s*>/i)?.[0];
  return { title, markdown: footer ? `${markdown}\n${articleToMarkdown(footer)}` : markdown };
}
