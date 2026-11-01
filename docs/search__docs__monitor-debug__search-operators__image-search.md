---
title: "Google 图片搜索运算符"
source: https://developers.google.com/search/docs/monitor-debug/search-operators/image-search?hl=zh_CN
slug: search__docs__monitor-debug__search-operators__image-search
path: /search/docs/monitor-debug/search-operators/image-search
---

# Google 图片搜索运算符

> 来源: https://developers.google.com/search/docs/monitor-debug/search-operators/image-search?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# Google 图片搜索运算符

 与网页搜索类似，Google 图片也支持专用的搜索运算符，即 `src:` 和 `imagesize:`。这些运算符仅适用于 Google 图片；它们对其他 Google 产品和服务不起作用。

## `src:` 搜索运算符

 `src:` 搜索运算符将返回在 `src` 属性中引用了运算符中提供的图片网址的网页。例如：

```
**src:**https://example.com/media/carrot.jpg
```

 该运算符会显示来自任何网域的网页，而不仅仅是来自运算符中指定的网址所在网域的网页。这可能有助于了解您在网站上托管的哪些图片被其他网站建立了[热链接](https://en.wikipedia.org/wiki/Hotlink)。

## `imagesize:` 搜索运算符

 `imagesize:` 搜索运算符将显示运算符中指定的尺寸的图片。您必须以“宽 `x` 高”的格式指定尺寸。例如：

```
**imagesize:**1500x1000
```

 此运算符与 `src:` 和 `site:` 运算符配合使用时会非常有帮助。例如，您可以查找您的网站上已编入索引的特定大小图片：

```
**src:**https://example.com/media/carrot.jpg **imagesize:**500x1200
```

将 `imagesize:` 与 `site:` 运算符配合使用，可以按照精确的大小查找图片：

```
**site:**https://example.com/ **imagesize:**500x1200
```

## 限制

 由于图片搜索运算符受索引和检索局限性的制约，因此您可能不会看到在执行标准搜索查询的情况下可能会显示的所有结果。

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-04-27。
