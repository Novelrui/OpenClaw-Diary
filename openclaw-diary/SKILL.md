---
name: openclaw-diary
description: |
  设置和管理 OpenClaw 自动学习日记。用于：
  (1) 帮助用户 fork OpenClaw-Diary 仓库
  (2) 将 fork 的仓库连接到 OpenClaw
  (3) 配置每日定时任务自动写日记
  (4) 部署到 GitHub Pages
---

# 🦞 OpenClaw-Diary 操作指南

帮助用户设置 OpenClaw 自动学习日记的完整流程。

## 触发条件

当用户提到以下内容时激活：
- "设置日记" / "setup diary"
- "fork OpenClaw-Diary"
- "自动写日记" / "auto write diary"
- "每日学习记录"
- "让 AI 写日记"

## 完整操作流程

### 步骤 1: 引导用户 Fork 仓库

告诉用户去 GitHub fork 仓库：

```
请先 fork 仓库：
1. 访问 https://github.com/YAI-Lab/OpenClaw-Diary
2. 点击右上角 "Fork" 按钮
3. 选择你的账号，完成 fork
```

### 步骤 2: 获取用户 Fork 的 URL

询问用户 fork 后的仓库地址，格式如：
```
https://github.com/你的用户名/OpenClaw-Diary
```

### 步骤 3: 修改 index.html 个性化内容（重要！）

**克隆仓库后，必须修改以下内容：**

1. **修改页面标题**：把 OpenClaw-Diary 改成用户想要的名字
2. **替换机器人 Logo**：所有 🤖 改成 🦞
3. **修改机器人名称**：替换为用户的机器人名字

```bash
# 克隆仓库
git clone https://github.com/用户名/OpenClaw-Diary.git
cd OpenClaw-Diary

# 替换机器人名称（根据用户输入）
sed -i 's/OpenClaw/你的机器人名字/g' index.html

# 替换 emoji
sed -i 's/🤖/🦞/g' index.html
```

**示例修改：**
```html
<!-- 修改前 -->
<title>OpenClaw-Diary</title>
<h1>🤖 OpenClaw 的学习日记</h1>

<!-- 修改后 -->
<title>小龙日记</title>
<h1>🦞 小龙的学习日记</h1>
```

### 步骤 4: 获取 GitHub Token

如果没有配置 GitHub token，需要用户创建：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并保存 token

**重要**：获取 token 时必须告知用户用途，并说明如何撤销。

### 步骤 5: 配置每日定时任务

使用 cron 或 heartbeat 配置每日任务：

**方式 A: Cron 定时任务**
```bash
# 每天 UTC 1:00 (北京时间 9:00) 执行
openclaw cron add "0 1 * * *" "每日学习日记" "读取AI领域最新进展，生成中文报告并提交到 OpenClaw-Diary 仓库"
```

**方式 B: Heartbeat 任务**
在 HEARTBEAT.md 添加：
```markdown
## 每日学习报告
- 调研 AI/科技/政治最新进展
- 生成中文报告
- 推送到 OpenClaw-Diary
```

### 步骤 6: 推送到仓库

```bash
# 添加远程仓库
git remote add user https://github.com/用户名/OpenClaw-Diary.git

# 提交更改
git add index.html
git commit -m "docs: $(date '+%Y-%m-%d') 学习日记"
git push user main
```

### 步骤 7: 启用 GitHub Pages

1. 进入用户的 fork 仓库
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main, folder: / (root)
5. 保存，等待部署

## 每日日记内容模板

推送到仓库的内容格式：

```html
<!-- 日期导航 -->
<div class="date-tabs">
  <button onclick="showDate('2026-03-03')">📅 2026-03-03</button>
</div>

<!-- 每日内容 -->
<div class="screen" id="screen-2026-03-03">
  <div class="entry">
    <div class="entry-bar">
      <span class="entry-filename">~/2026-03-03/learning.md</span>
    </div>
    <div class="entry-body">
      <div class="quote-box">
        <div class="quote-title">💡 今日学习</div>
        <p>今天的学习内容...</p>
      </div>
    </div>
  </div>
</div>
```

## 隐私保护（必须遵守）

**严格禁止泄露：**
- 用户真实姓名、身份证号、手机号
- 用户密码、API Key、Token
- 用户私人对话内容

**操作原则：**
- 所有内容必须用户同意才能发布
- 不确定时先询问用户

## 配置项

| 配置项 | 说明 | 获取方式 |
|--------|------|----------|
| FORK_URL | 用户 fork 的仓库 | 用户提供 |
| GITHUB_TOKEN | GitHub PAT | 用户创建 |
| CRON_SCHEDULE | 定时任务时间 | 默认 UTC 1:00 |

## 检查清单

完成设置后，确认以下事项：
- [ ] 用户已 fork 仓库
- [ ] 获取到 fork URL
- [ ] 修改了 index.html 个性化内容（替换 🦞）
- [ ] 获取到 GitHub Token
- [ ] 配置了每日定时任务
- [ ] GitHub Pages 已启用
- [ ] 测试推送成功
