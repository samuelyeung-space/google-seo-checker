# Publishing — 把 google-seo-checker 抽出 packoasis-storefront 推到独立公开仓库

这份文档只给维护者看。一次性步骤，跑完就独立了。

## 0. 决定 npm 包名

`package.json` 里现在写的是 `google-seo-checker`。先查它在 npm 占用情况：

```bash
npm view google-seo-checker name 2>&1 | head -1
```

如果返回 `404` 或 `E404` 就是可用；返回包信息就是被占了，需要换名（建议 `@yangyangnovelist-hub/google-seo-checker` 这种 scope 名，不冲突且明确归属）。

把可用的名字写回 `scripts/seo-checker/package.json` 的 `name` 字段，commit。

## 1. 从 packoasis-storefront 抽出子目录（保留 git 历史）

```bash
cd /Users/handsomeboy/Downloads/packoasis-storefront

# 把 scripts/seo-checker/ 的全部历史抽到一个新分支
git subtree split --prefix=scripts/seo-checker -b extract/google-seo-checker

# 在 /tmp 下新建一个目录作为新 repo 的根
git clone . /tmp/google-seo-checker --branch extract/google-seo-checker --single-branch
cd /tmp/google-seo-checker

# 删掉指回 packoasis 的 origin（subtree split 会带过来）
git remote remove origin

# 把 extract/google-seo-checker 分支改名 main
git branch -m main
```

此时 `/tmp/google-seo-checker` 是个独立的 git 仓库，根目录就是 `package.json`、`README.md`、`rules.mjs` ……

## 2. 创建 GitHub 公开仓库 + push

```bash
cd /tmp/google-seo-checker
gh repo create yangyangnovelist-hub/google-seo-checker \
  --public \
  --description "Page SEO checker grounded in 150 Google Search docs — 65 rules, every rule cites its source doc." \
  --source=. \
  --remote=origin \
  --push
```

确认 push 成功：`gh repo view yangyangnovelist-hub/google-seo-checker --web`。

## 3. 首发到 npm

```bash
cd /tmp/google-seo-checker

# 登录（首次）
npm login

# 跑测试 + dry-run 看打包没问题
npm test
npm pack --dry-run | tail -10

# 真正发布
npm publish --access public   # scope 包必须 --access public
```

如果用了 scope (`@xxx/google-seo-checker`)，必须加 `--access public`。

发完检查：`npm view google-seo-checker version` 应该返回 `0.1.0`。

## 4. 之后的迭代

两种工作流：

### A. 在 packoasis-storefront 里改，定期同步出去（推荐）

继续在 storefront 仓里改 `scripts/seo-checker/*`。当攒了想发布的改动：

```bash
cd /Users/handsomeboy/Downloads/packoasis-storefront
git subtree split --prefix=scripts/seo-checker -b extract/release-X.Y.Z
git push git@github.com:yangyangnovelist-hub/google-seo-checker.git extract/release-X.Y.Z:main
```

然后 bump version、`npm publish`。

### B. 反过来在独立仓改，pull back 到 storefront

```bash
cd /Users/handsomeboy/Downloads/packoasis-storefront
git subtree pull --prefix=scripts/seo-checker \
  git@github.com:yangyangnovelist-hub/google-seo-checker.git main
```

A 的好处是 packoasis 内的真实使用会持续 dogfood 新规则。B 的好处是公开仓的 issue / PR 直接落地。**建议 A。**

## 5. 自动月刷文档

GitHub Actions 已经在 `.github/workflows/refresh-docs.yml`，会每月 1 号自动 force-refresh `docs/` 并提 PR。手动跑：

```bash
gh workflow run refresh-docs.yml --repo yangyangnovelist-hub/google-seo-checker
```

合并 PR → 手动 bump patch version → `npm publish`。

## 6. Claude Code skill 发布

如果想让别人 `claude` 直接装：

```bash
# 在 Claude Code skill marketplace（如果有官方）提交 SKILL.md
# 或在 README 里告诉用户 ln -s 到 ~/.claude/skills/
```

目前推荐的快路径：在 README 里贴这条命令，让用户自己装：

```bash
mkdir -p ~/.claude/skills/google-seo-checker
ln -s "$(npm root -g)/google-seo-checker"/* ~/.claude/skills/google-seo-checker/
```

---

## Checklist

- [ ] `npm view <name>` 确认包名可用（或决定用 scope）
- [ ] `git subtree split` 抽出独立分支
- [ ] `gh repo create --public` 建 GitHub 公开仓
- [ ] `npm test` + `npm pack --dry-run` 检查打包
- [ ] `npm publish --access public`
- [ ] 第一条 GitHub Actions 月刷跑成功（手动触发一次验证）
- [ ] Twitter/Reddit/HN 发一条（如果想推广）
