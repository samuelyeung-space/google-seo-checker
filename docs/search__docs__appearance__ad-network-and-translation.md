---
title: "让广告网络能够使用与翻译相关的 Google 搜索功能"
source: https://developers.google.com/search/docs/appearance/ad-network-and-translation?hl=zh_CN
slug: search__docs__appearance__ad-network-and-translation
path: /search/docs/appearance/ad-network-and-translation
---

# 让广告网络能够使用与翻译相关的 Google 搜索功能

> 来源: https://developers.google.com/search/docs/appearance/ad-network-and-translation?hl=zh_CN

-  [ 首页 ](https://developers.google.com/?hl=zh-cn)
-

 [ Search Central ](https://developers.google.com/search?hl=zh-cn)
-

 [ Documentation ](https://developers.google.com/search/docs?hl=zh-cn)

# 让广告网络能够使用与翻译相关的 Google 搜索功能

 Google 搜索提供了多项[与翻译相关的功能](https://developers.google.com/search/docs/appearance/translated-results?hl=zh-cn)，让用户能够访问经过翻译的内容。如果您是广告网络运营方，但广告无法在已翻译的网页上正常投放，您需要按照本指南中的步骤确保广告能够正确呈现或归因。

## 我们的方法

 当用户从搜索结果中访问由[谷歌翻译](https://translate.google.com/about/?hl=zh-cn)提供的翻译内容时，用户点击翻译搜索结果后，Google 会从发布商处检索相应网页、重写源网址，并翻译该网页。

## 将谷歌翻译网址转换为原始网址

 如果您运营的广告网络依赖于发布商的源网址，您需要转换谷歌翻译网址，确保广告能正常投放。请按照以下步骤解码发布商的主机名：

1. 移除 `.translate.goog` 后缀，从主机名中提取网域前缀。
2. 根据 `,`（英文逗号）字符拆分 `_x_tr_enc` 参数，并将其保存为 `encoding_list`。
3. 将 `_x_tr_hp` 参数的值附加到网域前缀前面（如果存在）。
4. 如果 `encoding_list` 包含 `1` 且输出以 `1-` 开头，请从第 2 步的输出中移除 `1-` 前缀。
5. 如果 `encoding_list` 包含 `0` 且输出以 `0-` 开头，请从第 3 步的输出中移除 `0-` 前缀。如果您移除了相关前缀，请将 `is_idn` 设为 `true`；否则，请将 `is_idn` 设为 `false`。
6. 将 `/\b-\b/`（正则表达式）替换为 `.`（点）字符。
7. 将 `--`（双连字符）字符替换为 `-`（连字符）字符。
8. 如果 `is_idn` 设置为 `true`，请添加 Punycode 前缀 `xn--`。
9. **可选**：转换为 Unicode。

###  JavaScript 代码示例：从谷歌翻译网址中解码出主机名

```
function decodeHostname(proxyUrl) {
  const parsedProxyUrl = new URL(proxyUrl);
  const fullHost = parsedProxyUrl.hostname;
  // 1. Extract the domain prefix from the hostname, by removing the
        ".translate.goog" suffix
  let domainPrefix = fullHost.substring(0, fullHost.indexOf('.'));

  // 2. Split _x_tr_enc parameter by "," (comma), save as encodingList
  const encodingList = parsedProxyUrl.searchParams.has('_x_tr_enc') ?
      parsedProxyUrl.searchParams.get('_x_tr_enc').split(',') :
      [];

  // 3. Prepend value of _x_tr_hp parameter to the domain prefix, if it exists
  if (parsedProxyUrl.searchParams.has('_x_tr_hp')) {
    domainPrefix = parsedProxyUrl.searchParams.get('_x_tr_hp') + domainPrefix;
  }

  // 4. Remove '1-' prefix from the output of step 2 if encodingList contains
  //    '1' and the output begins with '1-'.
  if (encodingList.includes('1') && domainPrefix.startsWith('1-')) {
    domainPrefix = domainPrefix.substring(2);
  }

  // 5. Remove '0-' prefix from the output of step 3 if encodingList contains
  //    '0' and the output begins with '0-'.
  //    Set isIdn to true if removed, false otherwise.
  let isIdn = false;
  if (encodingList.includes('0') && domainPrefix.startsWith('0-')) {
    isIdn = true;
    domainPrefix = domainPrefix.substring(2);
  }

  // 6. Replace /\b-\b/ (regex) with '.' (dot) character.
  // 7. Replace '--' (double hyphen) with '-' (hyphen).
  let decodedSegment =
      domainPrefix.replaceAll(/\b-\b/g, '.').replaceAll('--', '-');

  // 8. If isIdn equals true, add the punycode prefix 'xn--'.
  if (isIdn) {
    decodedSegment = 'xn--' + decodedSegment;
  }
  return decodedSegment;
}
```

## 重新构建网址

1. 使用原始网页的网址，将主机名替换为已解码的主机名。
2. 移除所有 `_x_tr_*` 参数。

## 测试代码

 您可以使用下表为代码创建单元测试。对于给定 `proxyUrl`，`decodeHostname` 必须与预期值匹配。

 下表只能用于测试主机名解码代码。您需要确保网址的路径、片段和原始参数保留原样。

`proxyUrl`

`decodeHostname`

`https://example-com.translate.goog`

`example.com`

`https://foo-example-com.translate.goog`

`foo.example.com`

`https://foo--example-com.translate.goog`

`foo-example.com`

`https://0-57hw060o-com.translate.goog/?_x_tr_enc=0`

`xn--57hw060o.com (⚡😊.com)`

`https://1-en--us-example-com/?_x_tr_enc=1`

`en-us.example.com`

`https://0-en----w45as309w-com.translate.goog/?_x_tr_enc=0`

`xn--en--w45as309w.com (en-⚡😊.com)`

`https://1-0-----16pw588q-com.translate.goog/?_x_tr_enc=0,1`

`xn----16pw588q.com (⚡-😊.com)`

`https://lanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch-co-uk.translate.goog/?_x_tr_hp=l`

`llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk`

`https://lanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch-co-uk.translate.goog/?_x_tr_hp=www-l`

`www.llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk`

`https://a--aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-com.translate.goog/?_x_tr_hp=a--xn--xn--xn--xn--xn--------------------------a`

`a-xn-xn-xn-xn-xn-------------aa-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com`

`https://g5h3969ntadg44juhyah3c9aza87iiar4i410avdl8d3f1fuq3nz05dg5b-com.translate.goog/?_x_tr_enc=0&_x_tr_hp=0-`

`xn--g5h3969ntadg44juhyah3c9aza87iiar4i410avdl8d3f1fuq3nz05dg5b.com (💖🌲😊💞🤷‍♂️💗🌹😍🌸🌺😂😩😉😒😘💕🐶🐱🐭🐹🐰🐻🦊🐇😺.com)`

如未另行说明，那么本页面中的内容已根据[知识共享署名 4.0 许可](https://creativecommons.org/licenses/by/4.0/)获得了许可，并且代码示例已根据 [Apache 2.0 许可](https://www.apache.org/licenses/LICENSE-2.0)获得了许可。有关详情，请参阅 [Google 开发者网站政策](https://developers.google.com/site-policies?hl=zh-cn)。Java 是 Oracle 和/或其关联公司的注册商标。

最后更新时间 (UTC)：2026-02-20。
