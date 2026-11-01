---
title: "帮助读者通过 Google 搜索中的首选来源找到您的网站"
source: https://developers.google.com/search/docs/appearance/preferred-sources?hl=zh_CN
slug: search__docs__appearance__preferred-sources
path: /search/docs/appearance/preferred-sources
---

# 帮助读者通过 Google 搜索中的首选来源找到您的网站

> 来源: https://developers.google.com/search/docs/appearance/preferred-sources?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

#  帮助读者通过 Google 搜索中的首选来源找到您的网站

 如果您是网站所有者，可以帮助受众群体在 Google 搜索中将您的发布内容选为首选来源。当用户将您的网站选为首选来源后，您的内容更有可能在[焦点新闻](https://support.google.com/websearch/answer/16379181?hl=zh-cn)中显示，并带上“首选”徽章。在 AI 模式和 AI 概览中，如果用户已将您的网站选为首选来源，您的内容便会突出显示，并带上“首选”徽章。

## 功能可用性

 首选来源功能已在全球范围内推出，适用于所有支持 Google 搜索的语言环境中的“焦点新闻”功能。

 在所有支持 AI 模式和 AI 概览的语言及语言区域中，首选来源也均可在这两项功能中显示。如需让您的网站符合在这些功能中作为首选来源显示的条件，您必须确保[在 Search Console 中将网站纳入生成式 AI 搜索功能](https://support.google.com/webmasters/answer/16908024?hl=zh-cn)。

 只有网域级和子网域级网站才能显示在[来源偏好设置工具](https://www.google.com/preferences/source?hl=zh-cn)中。 例如，`https://www.example.com/` 和 `https://code.example.com/` 符合首选来源条件，但子目录 `https://www.example.com/blog` 不符合。

## 如何帮助用户将您的网站选为首选来源

 如果您的网站显示在[来源偏好设置工具](https://www.google.com/preferences/source?hl=zh-cn)中（您可以在该工具的搜索框中输入您的网站进行查看），您可以使用以下方法引导读者将您的网站选为首选来源：

-  [**标准 JavaScript 实现**](#standard-javascript)**（推荐）**：在网页中嵌入互动按钮，让读者能够顺畅地将您的网站添加为首选来源，并返回到您的网页。只需在 HTML 中添加两行代码，此选项即可呈现一个自动本地化的 Google 风格按钮，并支持设备和语言自定义。
-  [**使用自定义设计资源的高级 JavaScript 实现**](#advanced-javascript)：如果您想使用自己的设计资源并自定义标准 JavaScript 按钮，请按照高级 JavaScript 实现说明操作。最终用户界面流程与标准 JavaScript 实现相同。
-  [**深层链接实现**](#deeplink)：如果您无法实现互动按钮（例如，您的 CMS 不支持），则可以使用深层链接引导用户将您的网站添加为首选来源。为此，您可以在网页上添加文字链接或可点击的图片。您还可以在社交帖子、邮件简报或宣传内容中使用深层链接。

 这些方法只是示例，说明了如何吸引受众群体并帮助用户将您的网站选为首选来源。并非一定要完成这些步骤，才能让您的网站成为首选来源。

### 标准 JavaScript 实现（推荐）

 只需在 HTML 中添加两行代码，即可添加一个自动翻译的互动式按钮，让读者能够顺畅地将您的网站添加为首选来源，并返回到原先浏览的页面位置。您还可以设置按钮的主题（深色或浅色），并覆盖按钮语言。我们建议采用这种实现方式，因为它可以为读者提供最佳用户体验。

效果如下所示：

如需在网页上嵌入 JavaScript 按钮，请执行以下操作：

1.  将以下 `<script>` 标记添加到您的网页（最好在 `<head>` 元素中），该标记会加载首选来源库。

```
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
```

2.  将以下 `<div>` 标记添加到网页正文中您希望显示按钮的任意位置。

```
<div google-add-preferred-source-btn></div>
```

#### 设置按钮主题

 默认情况下，“添加到首选来源”按钮会以浅色主题显示。 如需调整主题，请将 `data-theme` 数据属性添加到 `<div>` 元素，并将其设置为 `light` 或 `dark`：

```
<div google-add-preferred-source-btn **data-theme="dark"**></div>
```

#### 覆盖按钮语言

 默认情况下，“添加到首选来源”按钮会根据用户的浏览器设置，以用户的语言显示。如需覆盖此行为，请将 `data-lang` 数据属性添加到 `<div>` 元素，并将其设置为您偏好的语言代码（下载[支持的语言代码列表](https://developers.google.com/static/search/docs/appearance/preferred-sources-languages.csv?hl=zh-cn)）：

```
<div google-add-preferred-source-btn **data-lang="en"**></div>
```

 [下载支持的语言代码](https://developers.google.com/static/search/docs/appearance/preferred-sources-languages.csv?hl=zh-cn)

### 使用自定义设计资源的高级 JavaScript 实现

 默认情况下，标准 JavaScript 按钮会自动扫描 DOM 中具有 `google-add-preferred-source-btn` 属性的元素，并渲染标准徽章。不过，对于您希望从自己的界面元素或应用里程碑触发流程的自定义集成，您可以程序化地初始化客户端，并将流程绑定到自定义触发器。

 将首选来源库集成到自定义界面、应用里程碑或现代框架应用中时，您可以使用我们的 JavaScript SDK 完全程序化地控制运行时设置和流程启动。我们提供两种不同的集成方法，具体取决于您的工具和架构：ES 模块导入 (ESM) 和标准脚本回调队列 (IIFE)。这两种分发模型提供相同的功能和方法。

#### ES 模块导入

 对于现代构建设置和基于模块的环境，请直接将库导入到代码中。

```
import { preferredSource } from
  "https://news.google.com/swg/js/v1/publisher.mjs";

// 1. Initialize directly using the imported module instance
preferredSource.init({
  theme: 'light', // Theme choice: "light" or "dark" (default "light")
  lang: 'en'      // Optional: override language (defaults to page language)
});

// 2. Programmatically bind flow invocation using a click handler
const button = document.querySelector('#myButton');
button.onclick = () => {
  preferredSource.addPreferredSource();
};
```

#### 标准脚本回调队列

 对于标准脚本标记集成，请在文档的 `<head>` 中加载以下脚本，并使用 `preferred-sources-control="manual"` 属性来防止自动渲染按钮：

```
<script async preferred-sources-control="manual" src="https://news.google.com/swg/js/v1/publisher.js"></script>
```

 **注意**：如果省略 `preferred-sources-control="manual"` 属性，它将搜索并立即初始化具有 `google-add-preferred-source-btn` 属性的所有元素。

 然后，使用全局 `PREFERRED_SOURCE` 回调队列初始化选项并绑定自定义触发器：

```
<script>
  (self.PREFERRED_SOURCE = self.PREFERRED_SOURCE || []).push(
    function(preferredSource) {
      // 1. Initialize with options
      preferredSource.init({
        theme: 'light',
        lang: 'en'
      });

      // 2. Programmatically bind trigger button
      const button = document.querySelector('#myButton');
      button.addEventListener('click', () => {
        preferredSource.addPreferredSource();
      });
  });
</script>
```

 想要深入了解涵盖按钮、声明式容器、IIFE 脚本以及 ES 模块包在交互式前端和后端实现中的实时应用案例，欢迎探索[首选来源演示](https://reader-revenue-demo.ue.r.appspot.com/preferred-sources/esm?hl=zh-cn)。

### 深层链接实现

 如果您无法在网站上使用 JavaScript，则可以使用深层链接将用户引导至[来源偏好设置工具](https://www.google.com/preferences/source?hl=zh-cn)，用户可以在该工具中将您的网站添加为首选来源并确认其选择。

 请使用以下网址格式，并将 `example.com` 替换为您的发布内容域名；通过该链接，用户可直接前往[来源偏好设置工具](https://www.google.com/preferences/source?hl=zh-cn)中您的网站：

```
https://www.google.com/preferences/source?q=Your_Website's_URL
```

#### 文字链接示例

```
<a
  href="https://www.google.com/preferences/source?q=example.com">
  Add as Preferred Source
</a>
```

#### 可点击的图片链接示例

```
<a
  href="https://www.google.com/preferences/source?q=example.com">
  <img src="path/to/your/button.png" alt="Add as Preferred Source">
</a>
```

#### 按钮图片资源

 您可以设计自己的自定义宣传徽章，也可以下载 Google 提供的官方翻译版图形资源：

 [下载按钮资源](https://services.google.com/fh/files/helpcenter/google_preferred_source_badge_all_languages.zip?hl=zh-cn)

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-09-25。
