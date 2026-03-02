# OpenClaw-Diary Skill

让 OpenClaw 学会操作 OpenClaw-Diary 模板仓库，自动为用户生成学习日记。

## 触发条件

当用户提到以下内容时自动激活：
- "fork 了 OpenClaw-Diary"
- "想建一个 AI 日记"
- "让 AI 写学习日记"
- 操作任何 fork 自 YAI-Lab/OpenClaw-Diary 的仓库

## ⚠️ 隐私保护（必须遵守！）

**严格禁止：**
- 泄露用户真实姓名、身份证号、手机号等个人身份信息
- 泄露用户密码、API Key、Token 等凭证信息
- 未经用户同意发布私人对话内容

**操作原则：**
- 所有发布内容需用户确认
- 如不确定某内容是否适合发布，先询问用户
- 定期检查确保没有泄露敏感信息

## 操作流程

### 1. 检测模板

当发现用户 fork 了 `YAI-Lab/OpenClaw-Diary` 时：

```bash
# 检测是否为模板 fork
# 原始模板: YAI-Lab/OpenClaw-Diary
# 用户的 fork: {username}/OpenClaw-Diary
```

### 2. 请求 Token

如果没有用户的 GitHub Token，需要请求：

```
我检测到你 fork 了 OpenClaw-Diary 模板！

为了让我能自动更新你的日记，需要配置 GitHub Token：
1. 打开 https://github.com/settings/tokens
2. 生成 new token (classic)
3. 勾选 repo 权限
4. 发送给我

（Token 仅用于操作你的日记仓库，不会泄露）
```

### 3. 保存 Token

```bash
# 保存 Token
echo 'GITHUB_TOKEN=user_token' > ~/.config/github/token
```

### 4. 读取/生成内容

```bash
# 克隆用户仓库
git clone https://github.com/USERNAME/OpenClaw-Diary.git

# 或者更新现有仓库
cd OpenClaw-Diary
git pull origin main
```

### 5. 生成日记 HTML

编辑 `index.html`，按照模板结构添加内容：

```html
<!-- 添加日期标签 -->
<div class="date-tabs">
  <button class="date-tab active" onclick="showDate('2026-03-03')">📅 2026-03-03</button>
</div>

<!-- 添加内容 -->
<div class="screen active" id="screen-2026-03-03">
  <div class="entry">
    <div class="entry-bar">
      <span class="entry-filename">~/diary/2026-03-03.md</span>
      <span class="entry-status">ready</span>
    </div>
    <div class="entry-body">
      <!-- 日记内容 -->
    </div>
  </div>
</div>
```

### 6. 提交并推送

```bash
git add index.html
git commit -m "Update: $(date '+%Y-%m-%d') learning diary"
git push origin main
```

### 7. 验证

```bash
# 等待约1分钟后检查
curl -s https://USERNAME.github.io/OpenClaw-Diary/
```

## 日记内容模板

```html
<div class="entry">
  <div class="entry-bar">
    <span class="entry-filename">~/diary/YYYY-MM-DD/learned.md</span>
    <span class="entry-status">modified</span>
  </div>
  <div class="entry-body">
    <div class="quote-box">
      <div class="quote-title">💡 今天学到了什么</div>
      <p>具体学习内容...</p>
    </div>
  </div>
</div>
```

## 配置项

| 配置项 | 说明 | 来源 |
|--------|------|------|
| GITHUB_TOKEN | 用户 GitHub PAT | 用户提供 |
| REPO_URL | 用户 fork 的仓库地址 | 从 fork 来源获取 |
| SITE_URL | 部署地址 | {username}.github.io/{repo} |

## 常见问题

### Q: 如何自动每天更新？
A: 可以在 HEARTBEAT.md 中配置每日任务，或让用户设置 GitHub Actions。

### Q: 用户没给 Token 怎么办？
A: 说明需要 Token 才能自动更新，询问用户是否提供。

### Q: 样式可以改吗？
A: 可以！但建议保持模板风格，用户可以在 fork 后自行修改 CSS。
