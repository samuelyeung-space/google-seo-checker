---
name: google-seo-checker
description: 用 65 条规则查一个 URL/HTML 的 SEO 问题，每条规则源自 Google Search 官方文档；并能反查 150 篇 Google docs 找原文。触发：SEO 检查 / page audit / canonical 对不对 / schema 报错 / Google 怎么说 X / robots.txt 是否屏蔽 / hreflang 配置 / Core Web Vitals / meta description 长度 / 这页能不能被收录。不触发：全站 crawl 排查（→ seo-geo-loop）、关键词调研（→ marketing:seo-audit）、新功能开发（→ precision-dev）、品牌洗白（→ brand-scrub）。
---

# google-seo-checker

> 150 篇 Google Search 官方文档 → 65 条机检规则 + 全文反查工具。
>
> 反面教材：写 SEO 不查原文 → AI 编一套"Google 推荐 ..." → 客户上线后 GSC 报错才发现规则错了。

## 心法

四条：

1. **每条规则有源** — 不是 LLM 凭印象凑的"最佳实践"，是 Google docs 里逐条找的。规则报错时给的 `→` 链接就是原文出处
2. **看 fail 之前先看 source** — 知道 Google 为什么这么要求才能判断 edge case 该不该绕
3. **lookup 找原文不要瞎编** — 用户问 "Google 怎么说 canonical"，调 `seo-lookup canonical` 把原文段落给他，不要凭记忆答
4. **65 条规则不是终点** — 自动检查只能覆盖"能 if-else 判断的部分"。E-E-A-T / helpful content / Core Updates 这类质性判断要人脑

## 用法

### 1. 查页面（最常见）

```bash
# 一行就跑
npx google-seo-checker https://example.com/

# 本地 HTML 也行
npx google-seo-checker dist/index.html

# 只看红的
npx google-seo-checker https://example.com/ --quiet

# CI / 喂给 LLM 处理
npx google-seo-checker https://example.com/ --json > report.json

# 只测某个维度
npx google-seo-checker https://example.com/ --filter=schema,meta

# 在 CI 里阻断
npx google-seo-checker https://example.com/ --fail-on=warn || exit 1
```

输出按 `fail → warn → pass → skip` 排序；每个失败给：

```
✗ no-mixed-content [可抓取性]
   HTTPS 页面不应引用 http: 资源
   ▶ 1 处 http: 资源
   http://s7.addthis.com/js/...
   → https://developers.google.com/search/docs/essentials/technical
```

### 2. 反查 Google 文档

```bash
# 单关键词
npx google-seo-lookup canonical

# 多关键词加权
npx google-seo-lookup hreflang 自引用 x-default

# 限板块
npx google-seo-lookup robots --section=crawling-indexing

# JSON 输出给 LLM
npx google-seo-lookup "Product offers" --json
```

返回相关度排序的文档列表 + 命中段落（关键词黄色高亮）+ 原文 URL。

### 3. 作为 JS 库引

```js
import { check } from 'google-seo-checker';
import { RULES, CATEGORIES } from 'google-seo-checker/rules';

const result = await check('https://example.com/');
console.log(result.summary); // { pass: 49, warn: 9, fail: 1, skip: 6 }
for (const r of result.results) {
  if (r.status === 'fail') console.log(r.id, r.message, r.source);
}
```

## 14 个规则类别

| 类别 | 大致检查 |
|------|---------|
| `crawl` | HTTPS, 200 状态, robots.txt, Sitemap, mixed-content, robots 是否屏蔽 CSS/JS |
| `index` | noindex, canonical (存在/绝对/同源), robots meta 冲突, rel=next/prev, amphtml |
| `meta` | title, description, charset, viewport, html lang, favicon, snippet 控制 |
| `headings` | h1 存在/唯一, 层级跳级 |
| `images` | alt, width/height, lazy, 通用文件名, 现代格式 |
| `links` | 空锚, 通用锚文本, `javascript:`/`#`, `target=_blank` rel |
| `schema` | JSON-LD 语法, @context, Product/Article/Breadcrumb/Organization/WebSite, SearchAction, 日期合法性 |
| `social` | og:title/description/image/url |
| `i18n` | hreflang self-reference |
| `content` | 正文字数 / 词数 |
| `url` | 大小写, 空格, `-` vs `_`, 长度 |
| `policy` | 关键字堆砌, 隐藏文字, doorway 模板 |
| `js` | onclick 导航, fragment-only 路由 |
| `perf` | 渲染阻塞 `<script>`, preconnect 缺失 |

完整规则定义见 `rules.mjs`，每条带 `source` 字段指向 [developers.google.com/search/docs](https://developers.google.com/search/docs) 的对应页。

## 何时该手动 spawn 这个 skill

| 场景 | 用法 |
|------|------|
| 用户："这页 SEO 有啥问题" | `seo-check <url>` |
| 用户："为什么我的 Product schema 报错" | `seo-check <url> --filter=schema` |
| 用户："Google 怎么说 X" | `seo-lookup X` |
| 用户："canonical 写绝对还是相对" | `seo-lookup canonical 绝对` |
| 用户："发布前帮我过一遍" | `seo-check <url> --fail-on=warn` |
| 用户："为什么 GSC 报 mobile usability" | `seo-check <url> --filter=meta,images,perf` |

## 不该触发的场景（路由到别处）

- **全站 crawl / GSC 漏点排查** → `seo-geo-loop`（这个 skill 是单页面）
- **关键词调研** → `marketing:seo-audit`
- **新功能开发 / 大规模重构** → `precision-dev`
- **品牌字符串洗白** → `brand-scrub`
- **SEO 基础铺设（sitemap/robots/redirect map 一次性）** → `seo-foundation`

## 局限（直说）

- **正则解析 HTML** — 碎 HTML / 嵌套 `<script>` 里塞 HTML 字符串可能误判
- **不跑 JS** — SSR 内容能看到，纯客户端渲染的 schema/title 看不到
- **单 URL 一次性** — 没有 site-wide crawl，没有 diff
- **CWV 是表层** — 只查 `width/height`、`preconnect`、阻塞脚本；真 LCP/CLS/INP 数字要 Lighthouse / CrUX
- **docs 是时刻快照** — 跑 `npm run fetch-docs -- --force` 刷新；CI 每月自动刷一次

## 维护

`docs/` 目录每月由 GitHub Actions (`refresh-docs.yml`) 自动刷新 + 提 PR。手动也行：

```bash
node fetch-docs.mjs --force   # 重新拉 150 篇
```
