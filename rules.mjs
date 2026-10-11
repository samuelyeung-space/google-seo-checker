// SEO rules grounded in Google Search docs. Each rule cites the
// developers.google.com page it derives from so a reader can verify.
// Rules return one of:
//   { status: 'pass' }
//   { status: 'pass', detail: '...' }
//   { status: 'warn', message: '...' , detail?: '...' }
//   { status: 'fail', message: '...', detail?: '...' }
//   { status: 'skip', message: '...' }   // e.g. data not fetched
//
// Severity (rule.severity) maps to the *default* status when a rule
// fails — 'error' fails, 'warn' warns. The check fn may override.

import { typeOf } from './lib/inspect.mjs';

const D = 'https://developers.google.com/search/docs';

// -- helpers --------------------------------------------------------------

function visibleChars(s) {
  return [...(s || '')].length;
}

function isAbsoluteUrl(u) {
  return /^https?:\/\//i.test(u || '');
}

function safeHostname(u) {
  try { return new URL(u).hostname; } catch { return null; }
}

function findRobotsDirective(metas) {
  // <meta name="robots" content="noindex"> etc.
  return metas.find(m => (m.name || '').toLowerCase() === 'robots');
}

function findNoindexMeta(metas) {
  // Google combines restrictions from every robots/googlebot meta tag.
  return metas.find(m => {
    if (!['robots', 'googlebot'].includes((m.name || '').toLowerCase())) return false;
    // Match whole directives: max-image-preview:none does not block indexing.
    return (m.content || '').toLowerCase().split(',')
      .some(value => ['noindex', 'none'].includes(value.trim()));
  });
}

// -- rules ----------------------------------------------------------------

export const RULES = [
  // ===== A. Crawlability =====================================================
  {
    id: 'https',
    category: 'crawl',
    severity: 'error',
    title: '页面必须通过 HTTPS 提供',
    source: `${D}/essentials/technical`,
    check: ({ pageUrl }) => {
      if (!pageUrl) return { status: 'skip', message: '本地文件模式，跳过' };
      return /^https:/i.test(pageUrl)
        ? { status: 'pass' }
        : { status: 'fail', message: '页面通过 HTTP 提供，应升级到 HTTPS' };
    },
  },
  {
    id: 'status-200',
    category: 'crawl',
    severity: 'error',
    title: 'HTTP 状态码应为 200',
    source: `${D}/crawling-indexing/troubleshoot-crawling-errors`,
    check: ({ status, mode }) => {
      if (mode === 'file') return { status: 'skip', message: '本地文件模式，跳过' };
      return status === 200
        ? { status: 'pass' }
        : { status: 'fail', message: `状态码 ${status}` };
    },
  },
  {
    id: 'robots-txt-exists',
    category: 'crawl',
    severity: 'warn',
    title: '站点根目录应有 robots.txt',
    source: `${D}/crawling-indexing/robots/intro`,
    check: ({ robots, mode }) => {
      if (mode === 'file') return { status: 'skip' };
      if (!robots) return { status: 'skip', message: '未抓取 robots.txt' };
      return robots.ok
        ? { status: 'pass', detail: robots.url }
        : { status: 'warn', message: `robots.txt 不可访问 (HTTP ${robots.status || '?'})` };
    },
  },
  {
    id: 'robots-allows-this-page',
    category: 'crawl',
    severity: 'error',
    title: 'robots.txt 不应屏蔽当前页面',
    source: `${D}/crawling-indexing/robots/intro`,
    check: ({ robotsParsed, pageUrl, mode }) => {
      if (mode === 'file' || !robotsParsed || !pageUrl) return { status: 'skip' };
      const path = new URL(pageUrl).pathname;
      const group = robotsParsed.groups.find(g => g.agent === '*' || /googlebot/i.test(g.agent)) || robotsParsed.groups[0];
      if (!group) return { status: 'pass', detail: 'robots.txt 无规则组' };
      // Longest-match wins; allow over disallow when same length (Google semantics simplified)
      let best = null;
      for (const r of group.rules) {
        const pattern = r.path;
        if (!pattern) continue;
        const re = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + (pattern.endsWith('$') ? '' : ''));
        if (re.test(path)) {
          if (!best || pattern.length > best.path.length) best = r;
        }
      }
      if (best && best.type === 'disallow' && best.path) {
        return { status: 'fail', message: `robots.txt Disallow 命中: ${best.path}` };
      }
      return { status: 'pass' };
    },
  },
  {
    id: 'sitemap-declared',
    category: 'crawl',
    severity: 'warn',
    title: 'robots.txt 应声明 Sitemap',
    source: `${D}/crawling-indexing/sitemaps/overview`,
    check: ({ robotsParsed, mode }) => {
      if (mode === 'file' || !robotsParsed) return { status: 'skip' };
      return robotsParsed.sitemaps.length > 0
        ? { status: 'pass', detail: robotsParsed.sitemaps.join(', ') }
        : { status: 'warn', message: 'robots.txt 中未声明 Sitemap' };
    },
  },
  {
    id: 'sitemap-reachable',
    category: 'crawl',
    severity: 'warn',
    title: '声明的 Sitemap 应可访问且包含 URL',
    source: `${D}/crawling-indexing/sitemaps/build-sitemap`,
    check: ({ sitemaps, mode }) => {
      if (mode === 'file' || !sitemaps || !sitemaps.length) return { status: 'skip' };
      const bad = sitemaps.filter(s => !s.ok);
      if (bad.length) return { status: 'warn', message: `Sitemap 抓取失败: ${bad.length}/${sitemaps.length}` };
      const empty = sitemaps.filter(s => !s.urls.length && !s.isIndex);
      if (empty.length) return { status: 'warn', message: `${empty.length} 个 Sitemap 为空` };
      const totalUrls = sitemaps.reduce((n, s) => n + (s.urls?.length || 0), 0);
      return { status: 'pass', detail: `共 ${totalUrls} 个 URL，${sitemaps.length} 个 Sitemap 文件` };
    },
  },
  {
    id: 'sitemap-size-limit',
    category: 'crawl',
    severity: 'warn',
    title: '单个 Sitemap 应 ≤ 50,000 URL 且 ≤ 50MB',
    source: `${D}/crawling-indexing/sitemaps/large-sitemaps`,
    check: ({ sitemaps, mode }) => {
      if (mode === 'file' || !sitemaps || !sitemaps.length) return { status: 'skip' };
      const oversize = sitemaps.filter(s => s.ok && !s.isIndex && (s.urls?.length > 50000 || s.size > 50 * 1024 * 1024));
      return oversize.length
        ? { status: 'warn', message: `${oversize.length} 个 Sitemap 超出 50K URL / 50MB 限制` }
        : { status: 'pass' };
    },
  },

  // ===== B. Indexability =====================================================
  {
    id: 'no-noindex',
    category: 'index',
    severity: 'error',
    title: '页面不应包含 noindex（除非有意排除索引）',
    source: `${D}/crawling-indexing/robots-meta-tag`,
    check: ({ metas, headers }) => {
      const meta = findNoindexMeta(metas);
      const xrobots = (headers?.['x-robots-tag'] || '').toLowerCase();
      if (meta) return { status: 'fail', message: `<meta name="${meta.name}" content="${meta.content}">` };
      if (/noindex/.test(xrobots)) return { status: 'fail', message: `X-Robots-Tag: ${headers['x-robots-tag']}` };
      return { status: 'pass' };
    },
  },
  {
    id: 'canonical-present',
    category: 'index',
    severity: 'warn',
    title: '应声明 <link rel="canonical">',
    source: `${D}/crawling-indexing/canonicalization`,
    check: ({ getLinkByRel, links }) => {
      const c = getLinkByRel(links, 'canonical');
      return c?.href
        ? { status: 'pass', detail: c.href }
        : { status: 'warn', message: '缺少 canonical 链接' };
    },
  },
  {
    id: 'canonical-absolute',
    category: 'index',
    severity: 'error',
    title: 'Canonical 必须是绝对 URL',
    source: `${D}/crawling-indexing/canonicalization`,
    check: ({ getLinkByRel, links }) => {
      const c = getLinkByRel(links, 'canonical');
      if (!c?.href) return { status: 'skip' };
      return isAbsoluteUrl(c.href)
        ? { status: 'pass' }
        : { status: 'fail', message: `canonical 是相对 URL: ${c.href}` };
    },
  },
  {
    id: 'canonical-self',
    category: 'index',
    severity: 'warn',
    title: 'Canonical 应指向自身或同源',
    source: `${D}/crawling-indexing/consolidate-duplicate-urls`,
    check: ({ getLinkByRel, links, pageUrl }) => {
      const c = getLinkByRel(links, 'canonical');
      if (!c?.href || !pageUrl) return { status: 'skip' };
      const ph = safeHostname(pageUrl);
      const ch = safeHostname(c.href);
      if (!ph || !ch) return { status: 'skip' };
      return ph === ch
        ? { status: 'pass' }
        : { status: 'warn', message: `canonical 跨域: ${ch} ≠ ${ph}` };
    },
  },

  // ===== C. Title & meta =====================================================
  {
    id: 'title-present',
    category: 'meta',
    severity: 'error',
    title: '<title> 必须存在且非空',
    source: `${D}/appearance/title-link`,
    check: ({ title }) => title && title.trim()
      ? { status: 'pass', detail: title }
      : { status: 'fail', message: '<title> 缺失或为空' },
  },
  {
    id: 'title-length',
    category: 'meta',
    severity: 'warn',
    title: '<title> 建议 15–60 字符（手机搜索结果常在 ~50 字符截断）',
    source: `${D}/appearance/title-link`,
    check: ({ title }) => {
      if (!title) return { status: 'skip' };
      const n = visibleChars(title);
      if (n < 15) return { status: 'warn', message: `标题过短 (${n} 字符)` };
      if (n > 60) return { status: 'warn', message: `标题过长 (${n} 字符)，可能被截断` };
      return { status: 'pass', detail: `${n} 字符` };
    },
  },
  {
    id: 'title-not-boilerplate',
    category: 'meta',
    severity: 'warn',
    title: '<title> 不应是模板/通用文案（如"首页""未命名"）',
    source: `${D}/appearance/title-link`,
    check: ({ title }) => {
      if (!title) return { status: 'skip' };
      const bad = ['首页', '主页', 'Home', 'Untitled', 'New Page', 'Document', '个人资料', 'Profile'];
      const t = title.trim();
      return bad.some(b => t === b || t.toLowerCase() === b.toLowerCase())
        ? { status: 'warn', message: `标题为通用模板文案: "${t}"` }
        : { status: 'pass' };
    },
  },
  {
    id: 'meta-description-present',
    category: 'meta',
    severity: 'warn',
    title: '应有 <meta name="description">',
    source: `${D}/appearance/snippet`,
    check: ({ getMetaByName, metas }) => {
      const d = getMetaByName(metas, 'description');
      return d?.content && d.content.trim()
        ? { status: 'pass', detail: `${visibleChars(d.content)} 字符` }
        : { status: 'warn', message: '缺少或为空的 meta description' };
    },
  },
  {
    id: 'meta-description-length',
    category: 'meta',
    severity: 'warn',
    title: 'meta description 建议 50–160 字符',
    source: `${D}/appearance/snippet`,
    check: ({ getMetaByName, metas }) => {
      const d = getMetaByName(metas, 'description');
      if (!d?.content) return { status: 'skip' };
      const n = visibleChars(d.content);
      if (n < 50) return { status: 'warn', message: `description 过短 (${n} 字符)` };
      if (n > 160) return { status: 'warn', message: `description 过长 (${n} 字符)，可能被截断` };
      return { status: 'pass', detail: `${n} 字符` };
    },
  },
  {
    id: 'meta-charset',
    category: 'meta',
    severity: 'error',
    title: '应声明 <meta charset>',
    source: `${D}/essentials/technical`,
    check: ({ metas }) => {
      const has = metas.some(m => m.charset || /content-type/i.test(m['http-equiv'] || ''));
      return has ? { status: 'pass' } : { status: 'fail', message: '缺少 <meta charset>' };
    },
  },
  {
    id: 'meta-viewport',
    category: 'meta',
    severity: 'error',
    title: '应声明响应式 viewport',
    source: `${D}/crawling-indexing/mobile/mobile-sites-mobile-first-indexing`,
    check: ({ getMetaByName, metas }) => {
      const v = getMetaByName(metas, 'viewport');
      if (!v?.content) return { status: 'fail', message: '缺少 <meta name="viewport">' };
      return /width=device-width/i.test(v.content)
        ? { status: 'pass', detail: v.content }
        : { status: 'warn', message: `viewport 未包含 width=device-width: ${v.content}` };
    },
  },
  {
    id: 'html-lang',
    category: 'meta',
    severity: 'warn',
    title: '<html> 应声明 lang 属性',
    source: `${D}/specialty/international/localized-versions`,
    check: ({ htmlAttrs }) => htmlAttrs.lang
      ? { status: 'pass', detail: htmlAttrs.lang }
      : { status: 'warn', message: '缺少 <html lang="...">' },
  },

  // ===== D. Headings =========================================================
  {
    id: 'h1-present',
    category: 'headings',
    severity: 'error',
    title: '应有一个非空 <h1>',
    source: `${D}/appearance/title-link`,
    check: ({ headings }) => {
      const h1s = headings.filter(h => h.level === 1 && h.text);
      if (!h1s.length) return { status: 'fail', message: '缺少 <h1>' };
      return { status: 'pass', detail: h1s[0].text.slice(0, 80) };
    },
  },
  {
    id: 'h1-single',
    category: 'headings',
    severity: 'warn',
    title: '建议页面只有一个 <h1>',
    source: `${D}/appearance/title-link`,
    check: ({ headings }) => {
      const h1s = headings.filter(h => h.level === 1);
      if (h1s.length <= 1) return { status: 'pass' };
      return { status: 'warn', message: `发现 ${h1s.length} 个 <h1>` };
    },
  },
  {
    id: 'heading-hierarchy',
    category: 'headings',
    severity: 'warn',
    title: '标题层级不应跳级（如 h1 → h3）',
    source: `${D}/fundamentals/seo-starter-guide`,
    check: ({ headings }) => {
      let last = 0;
      const skips = [];
      for (const h of headings) {
        if (last && h.level > last + 1) skips.push(`h${last}→h${h.level}`);
        last = h.level;
      }
      return skips.length
        ? { status: 'warn', message: `跳级: ${skips.slice(0, 5).join(', ')}` }
        : { status: 'pass' };
    },
  },

  // ===== E. Images ===========================================================
  {
    id: 'img-alt',
    category: 'images',
    severity: 'error',
    title: '所有 <img> 应有 alt 属性',
    source: `${D}/appearance/google-images`,
    check: ({ images }) => {
      if (!images.length) return { status: 'pass', detail: '页面无 <img>' };
      const missing = images.filter(i => i.alt === undefined);
      if (!missing.length) return { status: 'pass', detail: `${images.length} 张图片` };
      return { status: 'fail', message: `${missing.length}/${images.length} 张 <img> 缺少 alt 属性` };
    },
  },
  {
    id: 'img-dimensions',
    category: 'images',
    severity: 'warn',
    title: '<img> 应声明 width + height（防 CLS）',
    source: `${D}/appearance/core-web-vitals`,
    check: ({ images }) => {
      if (!images.length) return { status: 'pass' };
      const missing = images.filter(i => !i.width || !i.height);
      return missing.length
        ? { status: 'warn', message: `${missing.length}/${images.length} 张图片未声明 width/height` }
        : { status: 'pass' };
    },
  },
  {
    id: 'img-lazy-below-fold',
    category: 'images',
    severity: 'info',
    title: '非首屏图片建议 loading="lazy"',
    source: `${D}/crawling-indexing/javascript/lazy-loading`,
    check: ({ images }) => {
      if (images.length < 5) return { status: 'pass' };
      const lazy = images.filter(i => i.loading === 'lazy').length;
      return lazy >= Math.floor(images.length * 0.3)
        ? { status: 'pass', detail: `${lazy}/${images.length} 张使用 lazy` }
        : { status: 'warn', message: `仅 ${lazy}/${images.length} 张使用 loading="lazy"` };
    },
  },

  // ===== F. Links ============================================================
  {
    id: 'links-not-empty',
    category: 'links',
    severity: 'warn',
    title: '<a> 应有可见文字或 aria-label',
    source: `${D}/crawling-indexing/links-crawlable`,
    check: ({ anchors }) => {
      const bad = anchors.filter(a => a.href && !a.text && !a['aria-label'] && !/role=["']?img/.test(a['inner'] || ''));
      return bad.length
        ? { status: 'warn', message: `${bad.length} 个 <a> 既无文字也无 aria-label` }
        : { status: 'pass' };
    },
  },
  {
    id: 'links-not-vague',
    category: 'links',
    severity: 'info',
    title: '锚文本应有描述性（避免"点击这里""详情"）',
    source: `${D}/crawling-indexing/links-crawlable`,
    check: ({ anchors }) => {
      const vague = ['点击这里', '点击此处', '详情', '更多', 'click here', 'here', 'read more', 'more', 'link'];
      const bad = anchors.filter(a => a.text && vague.includes(a.text.toLowerCase()));
      return bad.length
        ? { status: 'warn', message: `${bad.length} 个链接使用通用锚文本（如"点击这里"）` }
        : { status: 'pass' };
    },
  },
  {
    id: 'links-no-javascript-void',
    category: 'links',
    severity: 'warn',
    title: '<a> href 不应为 "javascript:" 或 "#"（不可抓取）',
    source: `${D}/crawling-indexing/links-crawlable`,
    check: ({ anchors }) => {
      const bad = anchors.filter(a => /^javascript:/i.test(a.href || '') || a.href === '#');
      return bad.length
        ? { status: 'warn', message: `${bad.length} 个不可抓取的 href（javascript: 或 #）` }
        : { status: 'pass' };
    },
  },
  {
    id: 'links-target-blank-rel',
    category: 'links',
    severity: 'info',
    title: 'target="_blank" 的链接建议有 rel="noopener"',
    source: `${D}/crawling-indexing/qualify-outbound-links`,
    // 现代浏览器（Chromium 88+, Safari 12.1+, Firefox 79+）已对 target=_blank
    // 默认应用 noopener；显式声明仍是好习惯但严重度降为 info（不阻塞 CI）。
    check: ({ anchors }) => {
      const blanks = anchors.filter(a => a.target === '_blank');
      const bad = blanks.filter(a => !/noopener/i.test(a.rel || ''));
      if (!blanks.length) return { status: 'pass' };
      if (!bad.length) return { status: 'pass' };
      // info 级：用 warn 状态便于可见，但 severity 标记 info，规则元信息可让 CI 不阻断
      return { status: 'warn', message: `${bad.length}/${blanks.length} 个 target="_blank" 缺少 rel="noopener"（现代浏览器已默认 noopener，仅建议显式声明）` };
    },
  },

  // ===== G. Structured data ==================================================
  {
    id: 'jsonld-valid',
    category: 'schema',
    severity: 'error',
    title: 'JSON-LD 必须为有效 JSON',
    source: `${D}/appearance/structured-data/intro-structured-data`,
    check: ({ jsonLd }) => {
      const bad = jsonLd.filter(b => !b.ok);
      if (!jsonLd.length) return { status: 'pass', detail: '页面无 JSON-LD' };
      return bad.length
        ? { status: 'fail', message: `${bad.length} 个 JSON-LD 块解析失败`, detail: bad[0].error }
        : { status: 'pass', detail: `${jsonLd.length} 个 JSON-LD 块` };
    },
  },
  {
    id: 'jsonld-has-context',
    category: 'schema',
    severity: 'warn',
    title: 'JSON-LD 应声明 @context: https://schema.org',
    source: `${D}/appearance/structured-data/intro-structured-data`,
    check: ({ jsonLd }) => {
      if (!jsonLd.length) return { status: 'skip' };
      const bad = jsonLd.filter(b => b.ok && !/schema\.org/.test(JSON.stringify(b.parsed['@context'] || '')));
      return bad.length
        ? { status: 'warn', message: `${bad.length} 个 JSON-LD 块未声明 schema.org @context` }
        : { status: 'pass' };
    },
  },
  {
    id: 'jsonld-product-offers',
    category: 'schema',
    severity: 'error',
    title: 'Product 必须有 offers + price + priceCurrency',
    source: `${D}/appearance/structured-data/product`,
    check: ({ jsonLdNodes }) => {
      const products = jsonLdNodes.filter(n => /Product/i.test(typeOf(n)));
      if (!products.length) return { status: 'skip', message: '页面无 Product 节点' };
      const broken = products.filter(p => {
        const offers = Array.isArray(p.offers) ? p.offers : (p.offers ? [p.offers] : []);
        if (!offers.length) return true;
        return offers.some(o => {
          // A numeric zero is a valid free offer, unlike the other falsy values.
          const hasPrice = [o.price, o.priceSpecification?.price]
            .some(price => price === 0 || Boolean(price));
          return !hasPrice || !o.priceCurrency;
        });
      });
      return broken.length
        ? { status: 'fail', message: `${broken.length}/${products.length} 个 Product 缺少 price/priceCurrency` }
        : { status: 'pass', detail: `${products.length} 个 Product` };
    },
  },
  {
    id: 'jsonld-article-required',
    category: 'schema',
    severity: 'warn',
    title: 'Article 应有 headline + image + datePublished + author',
    source: `${D}/appearance/structured-data/article`,
    check: ({ jsonLdNodes }) => {
      const arts = jsonLdNodes.filter(n => /Article|NewsArticle|BlogPosting/i.test(typeOf(n)));
      if (!arts.length) return { status: 'skip' };
      const broken = arts.filter(a => !a.headline || !a.image || !a.datePublished || !a.author);
      return broken.length
        ? { status: 'warn', message: `${broken.length}/${arts.length} 个 Article 缺少必填字段` }
        : { status: 'pass', detail: `${arts.length} 个 Article` };
    },
  },
  {
    id: 'jsonld-breadcrumb-items',
    category: 'schema',
    severity: 'warn',
    title: 'BreadcrumbList 应有 itemListElement 数组',
    source: `${D}/appearance/structured-data/breadcrumb`,
    check: ({ jsonLdNodes }) => {
      const bcs = jsonLdNodes.filter(n => /BreadcrumbList/i.test(typeOf(n)));
      if (!bcs.length) return { status: 'skip' };
      const broken = bcs.filter(b => !Array.isArray(b.itemListElement) || b.itemListElement.length === 0);
      return broken.length
        ? { status: 'warn', message: `${broken.length}/${bcs.length} 个 BreadcrumbList 缺少 itemListElement` }
        : { status: 'pass', detail: `${bcs.length} 个 BreadcrumbList` };
    },
  },
  {
    id: 'jsonld-organization-recommended',
    category: 'schema',
    severity: 'info',
    title: '首页建议有 Organization 或 WebSite 结构化数据',
    source: `${D}/appearance/structured-data/organization`,
    check: ({ jsonLdNodes, pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      try {
        const u = new URL(pageUrl);
        if (u.pathname !== '/' && u.pathname !== '') return { status: 'skip' };
      } catch { return { status: 'skip' }; }
      const has = jsonLdNodes.some(n => /Organization|WebSite/i.test(typeOf(n)));
      return has
        ? { status: 'pass' }
        : { status: 'warn', message: '首页未声明 Organization/WebSite 结构化数据' };
    },
  },

  // ===== H. Social / Open Graph =============================================
  {
    id: 'og-title',
    category: 'social',
    severity: 'info',
    title: '建议有 og:title（社交分享卡片）',
    source: `${D}/appearance/site-names`,
    check: ({ getMetaByProperty, metas }) => {
      const og = getMetaByProperty(metas, 'og:title');
      return og?.content ? { status: 'pass' } : { status: 'warn', message: '缺少 og:title' };
    },
  },
  {
    id: 'og-description',
    category: 'social',
    severity: 'info',
    title: '建议有 og:description',
    source: `${D}/appearance/snippet`,
    check: ({ getMetaByProperty, metas }) => {
      const og = getMetaByProperty(metas, 'og:description');
      return og?.content ? { status: 'pass' } : { status: 'warn', message: '缺少 og:description' };
    },
  },
  {
    id: 'og-image',
    category: 'social',
    severity: 'info',
    title: '建议有 og:image',
    source: `${D}/appearance/google-discover`,
    check: ({ getMetaByProperty, metas }) => {
      const og = getMetaByProperty(metas, 'og:image');
      if (!og?.content) return { status: 'warn', message: '缺少 og:image' };
      return isAbsoluteUrl(og.content)
        ? { status: 'pass', detail: og.content }
        : { status: 'warn', message: `og:image 应为绝对 URL: ${og.content}` };
    },
  },
  {
    id: 'og-url',
    category: 'social',
    severity: 'info',
    title: '建议有 og:url（且与 canonical 一致）',
    source: `${D}/appearance/site-names`,
    check: ({ getMetaByProperty, metas, getLinkByRel, links }) => {
      const og = getMetaByProperty(metas, 'og:url');
      if (!og?.content) return { status: 'warn', message: '缺少 og:url' };
      const can = getLinkByRel(links, 'canonical');
      if (can?.href && og.content !== can.href) {
        return { status: 'warn', message: `og:url ≠ canonical (${og.content} vs ${can.href})` };
      }
      return { status: 'pass' };
    },
  },

  // ===== I. Favicon ==========================================================
  {
    id: 'favicon',
    category: 'meta',
    severity: 'warn',
    title: '应声明 <link rel="icon">',
    source: `${D}/appearance/favicon-in-search`,
    check: ({ links }) => {
      const icon = links.find(l => /(^|\s)(icon|shortcut icon|apple-touch-icon)(\s|$)/i.test(l.rel || ''));
      return icon
        ? { status: 'pass', detail: icon.href }
        : { status: 'warn', message: '缺少 favicon link' };
    },
  },

  // ===== J. Internationalization ============================================
  {
    id: 'hreflang-self',
    category: 'i18n',
    severity: 'info',
    title: '若有 hreflang，应包含 self（x-default 或当前 locale）',
    source: `${D}/specialty/international/localized-versions`,
    check: ({ getAllLinksByRel, links, pageUrl }) => {
      const hreflangs = getAllLinksByRel(links, 'alternate').filter(l => l.hreflang);
      if (!hreflangs.length) return { status: 'skip' };
      const hasXDefault = hreflangs.some(l => l.hreflang === 'x-default');
      const hasSelf = pageUrl ? hreflangs.some(l => l.href === pageUrl) : false;
      if (hasXDefault || hasSelf) return { status: 'pass', detail: `${hreflangs.length} 条 hreflang` };
      return { status: 'warn', message: 'hreflang 集合缺少 x-default 或自引用' };
    },
  },

  // ===== K. Helpful content meta-checks =====================================
  {
    id: 'duplicate-title-h1',
    category: 'meta',
    severity: 'info',
    title: '<title> 与 <h1> 完全相同（不一定是错，提示一下）',
    source: `${D}/fundamentals/creating-helpful-content`,
    check: ({ title, headings }) => {
      const h1 = headings.find(h => h.level === 1);
      if (!title || !h1) return { status: 'skip' };
      return title.trim() === h1.text.trim()
        ? { status: 'warn', message: '<title> 与 <h1> 完全相同——建议为 title 加上品牌或差异化后缀' }
        : { status: 'pass' };
    },
  },
  {
    id: 'word-count',
    category: 'content',
    severity: 'info',
    title: '页面正文应有合理的内容长度（>200 词/字）',
    source: `${D}/fundamentals/creating-helpful-content`,
    check: ({ body }) => {
      const text = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const wordCount = text.split(' ').filter(Boolean).length;
      const charCount = visibleChars(text);
      // For CJK heuristic: if ratio of non-ASCII > 50%, judge by chars
      const nonAscii = (text.match(/[^\x00-\x7F]/g) || []).length;
      const isCjk = charCount > 0 && nonAscii / charCount > 0.3;
      const n = isCjk ? charCount : wordCount;
      const threshold = isCjk ? 300 : 200;
      return n >= threshold
        ? { status: 'pass', detail: isCjk ? `${charCount} 字` : `${wordCount} 词` }
        : { status: 'warn', message: `正文过短 (${isCjk ? charCount + '字' : wordCount + '词'})` };
    },
  },

  // ===== L. URL hygiene ======================================================
  {
    id: 'url-lowercase',
    category: 'url',
    severity: 'info',
    title: 'URL 路径建议全小写',
    source: `${D}/crawling-indexing/url-structure`,
    check: ({ pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      const path = new URL(pageUrl).pathname;
      return /[A-Z]/.test(path)
        ? { status: 'warn', message: `URL 含大写字母: ${path}` }
        : { status: 'pass' };
    },
  },
  {
    id: 'url-no-spaces',
    category: 'url',
    severity: 'warn',
    title: 'URL 不应包含空格或 URL 编码空格',
    source: `${D}/crawling-indexing/url-structure`,
    check: ({ pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      const path = new URL(pageUrl).pathname;
      return /\s|%20/i.test(path)
        ? { status: 'warn', message: `URL 含空格: ${path}` }
        : { status: 'pass' };
    },
  },
  {
    id: 'url-hyphens-not-underscores',
    category: 'url',
    severity: 'info',
    title: '多词 URL 应用 `-` 分隔，避免 `_`',
    source: `${D}/crawling-indexing/url-structure`,
    check: ({ pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      const path = new URL(pageUrl).pathname;
      const segs = path.split('/').filter(Boolean);
      const bad = segs.filter(s => /_/.test(s) && !/^_/.test(s));
      return bad.length
        ? { status: 'warn', message: `URL 段使用下划线分隔: ${bad.join(', ')}` }
        : { status: 'pass' };
    },
  },
  {
    id: 'url-length',
    category: 'url',
    severity: 'info',
    title: 'URL 不应过长（路径 ≤ 75 字符）',
    source: `${D}/crawling-indexing/url-structure`,
    check: ({ pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      const path = new URL(pageUrl).pathname;
      return path.length > 75
        ? { status: 'warn', message: `URL 路径过长 (${path.length} 字符)` }
        : { status: 'pass' };
    },
  },

  // ===== M. Spam policies (essentials/spam-policies) =========================
  {
    id: 'no-keyword-stuffing',
    category: 'policy',
    severity: 'warn',
    title: '正文不应出现关键字堆砌（单一词频 > 5%）',
    source: `${D}/essentials/spam-policies`,
    check: ({ body }) => {
      const text = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').toLowerCase();
      const words = text.match(/[a-z一-鿿]{4,}/g) || [];
      if (words.length < 200) return { status: 'skip', message: '正文不足以判定' };
      const freq = new Map();
      const stop = new Set(['this', 'that', 'with', 'from', 'have', 'will', 'your', 'about', 'more', 'these', 'their', 'which', 'where', 'when', 'they', 'them', 'than', 'into', 'such', 'some', 'also', 'been', 'were', 'each', 'page', 'site', 'used', 'using']);
      for (const w of words) if (!stop.has(w)) freq.set(w, (freq.get(w) || 0) + 1);
      const top = [...freq.entries()].sort((a, b) => b[1] - a[1])[0];
      if (!top) return { status: 'pass' };
      const ratio = top[1] / words.length;
      return ratio > 0.05
        ? { status: 'warn', message: `"${top[0]}" 在正文出现 ${top[1]} 次 (${(ratio * 100).toFixed(1)}%)` }
        : { status: 'pass', detail: `最高词频 "${top[0]}" ${(ratio * 100).toFixed(1)}%` };
    },
  },
  {
    id: 'no-hidden-text',
    category: 'policy',
    severity: 'warn',
    title: '不应有隐藏文字（display:none / visibility:hidden 大段文字）',
    source: `${D}/essentials/spam-policies`,
    check: ({ body }) => {
      const re = /<[^>]+style\s*=\s*["'][^"']*(?:display\s*:\s*none|visibility\s*:\s*hidden|font-size\s*:\s*0|color\s*:\s*(?:white|#fff|#ffffff)\s*;\s*background[^"']*(?:white|#fff))[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi;
      let m, hidden = 0;
      while ((m = re.exec(body)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (text.length > 50) hidden++;
      }
      return hidden > 0
        ? { status: 'warn', message: `${hidden} 处疑似隐藏文字（>50 字符）` }
        : { status: 'pass' };
    },
  },
  {
    id: 'no-doorway-title-pattern',
    category: 'policy',
    severity: 'info',
    title: '<title> 不应只是城市/关键词的模板拼接（"X in Y"）',
    source: `${D}/essentials/spam-policies`,
    check: ({ title }) => {
      if (!title) return { status: 'skip' };
      const t = title.toLowerCase();
      const cities = ['new york', 'los angeles', 'chicago', 'shanghai', 'beijing', 'tokyo', 'london'];
      const hits = cities.filter(c => t.includes(c));
      return hits.length >= 2
        ? { status: 'warn', message: `标题含多个地名（疑似 doorway 模板）: ${hits.join(', ')}` }
        : { status: 'pass' };
    },
  },

  // ===== N. JavaScript & crawlability of links ===============================
  {
    id: 'js-href-navigation',
    category: 'js',
    severity: 'warn',
    title: '导航不应仅用 onclick — 应使用 <a href>',
    source: `${D}/crawling-indexing/links-crawlable`,
    check: ({ body }) => {
      const onclicks = (body.match(/onclick\s*=\s*["'][^"']*(?:location\.href|window\.location|navigate\(|window\.open)/gi) || []).length;
      return onclicks > 0
        ? { status: 'warn', message: `${onclicks} 处用 onclick 做导航，建议改为 <a href>` }
        : { status: 'pass' };
    },
  },
  {
    id: 'js-fragment-routing',
    category: 'js',
    severity: 'info',
    title: '链接不应只用 # 片段作为路由（Google 不索引 fragment-only URL）',
    source: `${D}/crawling-indexing/javascript/javascript-seo-basics`,
    check: ({ anchors }) => {
      const frags = anchors.filter(a => /^#[^!]/.test(a.href || '') && (a.href || '').length > 1 && a.text);
      return frags.length > 5
        ? { status: 'warn', message: `${frags.length} 个链接仅用 # 片段（不可索引）` }
        : { status: 'pass' };
    },
  },

  // ===== O. Mixed content & HTTPS ============================================
  {
    id: 'no-mixed-content',
    category: 'crawl',
    severity: 'error',
    title: 'HTTPS 页面不应引用 http: 资源（mixed content）',
    source: `${D}/essentials/technical`,
    check: ({ html, pageUrl }) => {
      if (!pageUrl || !/^https:/i.test(pageUrl)) return { status: 'skip' };
      const re = /(?:src|href)\s*=\s*["'](http:\/\/[^"']+)["']/gi;
      const hits = [];
      let m;
      while ((m = re.exec(html)) !== null && hits.length < 10) {
        // exclude xmlns/schema URLs which are namespaces not resources
        if (!/schema\.org|w3\.org\/[12]/.test(m[1])) hits.push(m[1]);
      }
      return hits.length
        ? { status: 'fail', message: `${hits.length} 处 http: 资源`, detail: hits.slice(0, 3).join(', ') }
        : { status: 'pass' };
    },
  },

  // ===== P. Image quality (image SEO) =======================================
  {
    id: 'img-descriptive-filenames',
    category: 'images',
    severity: 'info',
    title: '图片文件名应有描述性（避免 IMG_1234.jpg / photo123.png）',
    source: `${D}/appearance/google-images`,
    check: ({ images }) => {
      if (!images.length) return { status: 'pass' };
      const bad = images.filter(i => {
        const src = i.src || '';
        const name = src.split('/').pop()?.split('?')[0] || '';
        return /^(img|image|photo|pic|dsc|untitled|screenshot)[-_]?\d{2,}\.(jpg|jpeg|png|webp|gif|avif)$/i.test(name)
          || /^\d{6,}\.(jpg|jpeg|png|webp|gif|avif)$/i.test(name);
      });
      return bad.length
        ? { status: 'warn', message: `${bad.length}/${images.length} 张图片文件名通用（IMG_1234 类）` }
        : { status: 'pass' };
    },
  },
  {
    id: 'img-modern-format',
    category: 'images',
    severity: 'info',
    title: '图片建议使用现代格式（webp / avif）',
    source: `${D}/appearance/core-web-vitals`,
    check: ({ images }) => {
      if (images.length < 5) return { status: 'pass' };
      const legacy = images.filter(i => /\.(jpe?g|png|gif)(\?|$)/i.test(i.src || ''));
      const ratio = legacy.length / images.length;
      return ratio > 0.7
        ? { status: 'warn', message: `${legacy.length}/${images.length} 张图为 jpg/png/gif，可考虑 webp/avif` }
        : { status: 'pass' };
    },
  },

  // ===== Q. Performance hints =================================================
  {
    id: 'render-blocking-head-scripts',
    category: 'perf',
    severity: 'warn',
    title: '<head> 内 <script src> 应有 async 或 defer',
    source: `${D}/appearance/core-web-vitals`,
    check: ({ html }) => {
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      if (!headMatch) return { status: 'skip' };
      const head = headMatch[1];
      const scripts = head.match(/<script\b[^>]*\ssrc\s*=[^>]*>/gi) || [];
      const blocking = scripts.filter(s => !/\b(async|defer|type\s*=\s*["']module)/i.test(s));
      return blocking.length
        ? { status: 'warn', message: `${blocking.length} 个阻塞渲染的 <script> 在 <head>（无 async/defer/module）` }
        : { status: 'pass' };
    },
  },
  {
    id: 'preconnect-critical-origins',
    category: 'perf',
    severity: 'info',
    title: '若引用 ≥3 个外部 origin，建议 preconnect/dns-prefetch 主要的',
    source: `${D}/appearance/core-web-vitals`,
    check: ({ links, html, pageUrl }) => {
      const ownHost = pageUrl ? safeHostname(pageUrl) : null;
      const re = /(?:src|href)\s*=\s*["']https?:\/\/([^\/"'?#]+)/gi;
      const externals = new Set();
      let m;
      while ((m = re.exec(html)) !== null) {
        if (m[1] !== ownHost && !/schema\.org|w3\.org/.test(m[1])) externals.add(m[1]);
      }
      if (externals.size < 3) return { status: 'pass' };
      const preconnects = new Set(
        links.filter(l => /preconnect|dns-prefetch/i.test(l.rel || '')).map(l => safeHostname(l.href)).filter(Boolean)
      );
      const missing = [...externals].filter(h => !preconnects.has(h));
      return missing.length === externals.size
        ? { status: 'warn', message: `${externals.size} 个外部 origin 但未声明 preconnect/dns-prefetch` }
        : { status: 'pass', detail: `${preconnects.size}/${externals.size} 个 origin 已预连接` };
    },
  },

  // ===== R. Robots meta tag advanced =========================================
  {
    id: 'robots-meta-conflict',
    category: 'index',
    severity: 'warn',
    title: '<meta robots> 与 X-Robots-Tag 不应矛盾',
    source: `${D}/crawling-indexing/robots-meta-tag`,
    check: ({ metas, headers }) => {
      const meta = findRobotsDirective(metas);
      const x = (headers?.['x-robots-tag'] || '').toLowerCase();
      const m = (meta?.content || '').toLowerCase();
      if (!meta && !x) return { status: 'pass' };
      const metaIdx = /index/.test(m) && !/noindex/.test(m);
      const metaNo = /noindex/.test(m);
      const xIdx = /index/.test(x) && !/noindex/.test(x);
      const xNo = /noindex/.test(x);
      if ((metaIdx && xNo) || (metaNo && xIdx)) {
        return { status: 'warn', message: `指令冲突: meta="${m}" / header="${x}"` };
      }
      return { status: 'pass' };
    },
  },

  // ===== S. Pagination =======================================================
  {
    id: 'rel-next-prev-info',
    category: 'index',
    severity: 'info',
    title: 'rel=next/prev 已被 Google 弃用（不影响排名，可移除）',
    source: `${D}/specialty/ecommerce/pagination-and-incremental-page-loading`,
    check: ({ links }) => {
      const np = links.filter(l => /(^|\s)(next|prev)(\s|$)/i.test(l.rel || ''));
      return np.length
        ? { status: 'warn', message: `检测到 ${np.length} 个 rel="next/prev"（Google 已不再使用）` }
        : { status: 'pass' };
    },
  },

  // ===== T. AMP ==============================================================
  {
    id: 'amphtml-absolute',
    category: 'index',
    severity: 'warn',
    title: '若声明 <link rel="amphtml">，应为绝对 URL',
    source: `${D}/crawling-indexing/amp/about-amp`,
    check: ({ getLinkByRel, links }) => {
      const amp = getLinkByRel(links, 'amphtml');
      if (!amp) return { status: 'skip' };
      return isAbsoluteUrl(amp.href)
        ? { status: 'pass', detail: amp.href }
        : { status: 'warn', message: `amphtml 不是绝对 URL: ${amp.href}` };
    },
  },

  // ===== U. Site name / SearchAction ========================================
  {
    id: 'jsonld-website-name',
    category: 'schema',
    severity: 'info',
    title: 'WebSite 结构化数据应有 name',
    source: `${D}/appearance/site-names`,
    check: ({ jsonLdNodes }) => {
      const sites = jsonLdNodes.filter(n => /WebSite/i.test(typeOf(n)));
      if (!sites.length) return { status: 'skip' };
      const broken = sites.filter(s => !s.name);
      return broken.length
        ? { status: 'warn', message: `${broken.length}/${sites.length} 个 WebSite 缺少 name` }
        : { status: 'pass' };
    },
  },
  {
    id: 'jsonld-site-searchaction',
    category: 'schema',
    severity: 'info',
    title: '首页 WebSite 建议声明 potentialAction (SearchAction) 启用站内搜索框',
    source: `${D}/appearance/sitelinks`,
    check: ({ jsonLdNodes, pageUrl }) => {
      if (!pageUrl) return { status: 'skip' };
      try {
        const u = new URL(pageUrl);
        if (u.pathname !== '/' && u.pathname !== '') return { status: 'skip' };
      } catch { return { status: 'skip' }; }
      const sites = jsonLdNodes.filter(n => /WebSite/i.test(typeOf(n)));
      if (!sites.length) return { status: 'warn', message: '首页未声明 WebSite 结构化数据' };
      const hasAction = sites.some(s => {
        const a = Array.isArray(s.potentialAction) ? s.potentialAction : (s.potentialAction ? [s.potentialAction] : []);
        return a.some(act => /SearchAction/i.test(act['@type'] || ''));
      });
      return hasAction
        ? { status: 'pass' }
        : { status: 'warn', message: 'WebSite 未声明 SearchAction（影响站内搜索框 sitelinks）' };
    },
  },

  // ===== V. Publication / freshness =========================================
  {
    id: 'article-date-sanity',
    category: 'schema',
    severity: 'warn',
    title: 'Article datePublished 不应在未来 / 早于 1980 / 晚于 dateModified',
    source: `${D}/appearance/publication-dates`,
    check: ({ jsonLdNodes }) => {
      const arts = jsonLdNodes.filter(n => /Article|NewsArticle|BlogPosting/i.test(typeOf(n)));
      if (!arts.length) return { status: 'skip' };
      const now = Date.now();
      const earliest = new Date('1980-01-01').getTime();
      const bad = [];
      for (const a of arts) {
        const dp = a.datePublished ? new Date(a.datePublished).getTime() : NaN;
        const dm = a.dateModified ? new Date(a.dateModified).getTime() : NaN;
        if (!isFinite(dp)) { bad.push('datePublished 解析失败'); continue; }
        if (dp > now + 86400000) bad.push('datePublished 在未来');
        if (dp < earliest) bad.push('datePublished < 1980');
        if (isFinite(dm) && dp > dm + 86400000) bad.push('datePublished 晚于 dateModified');
      }
      return bad.length
        ? { status: 'warn', message: bad.slice(0, 3).join('; ') }
        : { status: 'pass', detail: `${arts.length} 个 Article 日期合理` };
    },
  },

  // ===== W. Crawl budget – don't block CSS/JS ===============================
  {
    id: 'robots-allows-css-js',
    category: 'crawl',
    severity: 'warn',
    title: 'robots.txt 不应屏蔽 CSS / JS（Google 需要看到样式做移动可读性判断）',
    source: `${D}/crawling-indexing/googlebot`,
    check: ({ robotsParsed, mode }) => {
      if (mode === 'file' || !robotsParsed) return { status: 'skip' };
      const group = robotsParsed.groups.find(g => g.agent === '*' || /googlebot/i.test(g.agent)) || robotsParsed.groups[0];
      if (!group) return { status: 'pass' };
      const bad = group.rules.filter(r => r.type === 'disallow' && /\.(css|js|m?js)(\$|$)/i.test(r.path));
      return bad.length
        ? { status: 'warn', message: `robots.txt 屏蔽了 CSS/JS: ${bad.map(b => b.path).slice(0, 3).join(', ')}` }
        : { status: 'pass' };
    },
  },

  // ===== X. Snippet controls (info) =========================================
  {
    id: 'max-snippet-info',
    category: 'meta',
    severity: 'info',
    title: '检测到 max-snippet / max-image-preview / max-video-preview（提示）',
    source: `${D}/crawling-indexing/robots-meta-tag`,
    check: ({ metas }) => {
      const meta = findRobotsDirective(metas);
      const content = (meta?.content || '').toLowerCase();
      const hits = ['max-snippet', 'max-image-preview', 'max-video-preview', 'noarchive', 'nosnippet', 'notranslate'].filter(k => content.includes(k));
      return hits.length
        ? { status: 'warn', message: `robots meta 含 ${hits.join(', ')} — 已确认是有意配置吗？` }
        : { status: 'pass' };
    },
  },
];

export const CATEGORIES = {
  crawl: '可抓取性',
  index: '可索引性',
  meta: '<head> 元信息',
  headings: '标题层级',
  images: '图片',
  links: '链接',
  schema: '结构化数据',
  social: '社交卡片',
  i18n: '国际化',
  content: '内容质量',
  url: 'URL 结构',
  policy: '反垃圾内容政策',
  js: 'JavaScript 可抓取性',
  perf: '性能与渲染',
};
