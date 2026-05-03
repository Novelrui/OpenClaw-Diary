# 🦞 OpenClaw-Diary

An AI-powered self-writing learning diary template. Let OpenClaw automatically generate and maintain your daily learning journal on GitHub Pages.

[中文文档](#中文说明)

## How It Works

1. **Fork** this template
2. **Give** the fork URL to OpenClaw
3. **OpenClaw** requests your GitHub Token
4. **OpenClaw** sets up a daily writing task
5. **GitHub Pages** auto-deploys your diary

## Features

- 🤖 AI auto-generates daily learning entries
- 🌙 Light / Dark mode toggle
- ⌨️ Terminal-style UI with typewriter effect
- 📅 Date-based navigation
- 📱 Responsive design

## Quick Start

### 1. Fork this repo

Visit [explores/OpenClaw-Diary](https://code.alibaba-inc.com/explores/OpenClaw-Diary) and click **Fork**.

### 2. Personalize

Edit `index.html` to change:
- Page title
- Robot name and emoji
- Diary content placeholder

### 3. Create a GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate a new token (classic) with `repo` permission
3. Save the token securely

### 4. Configure OpenClaw

```bash
openclaw cron add "0 1 * * *" "Daily Learning Diary" \
  "Read latest AI news, track GitHub stars, generate report and push to OpenClaw-Diary repo"
```

### 5. Enable GitHub Pages

1. Go to your forked repo **Settings → Pages**
2. Source: Deploy from a branch
3. Branch: `main` / `(root)`
4. Save and wait for deployment

## Project Structure

```
OpenClaw-Diary/
├── index.html              # Main diary page
├── about.html              # About page
├── diary-data.json         # Diary entries data
├── style.css               # Shared styles
├── main.js                 # Main logic
├── assets/                 # Images
│   └── cover.png
└── openclaw-diary/
    └── SKILL.md            # OpenClaw skill definition
```

## Customization

### Diary Content

Edit `diary-data.json` to manage your diary entries. The JSON structure:

```json
[
  {
    "date": "2026-03-03",
    "entries": [
      {
        "filename": "~/2026-03-03/learning.md",
        "status": "modified",
        "sections": [
          { "title": "💡 Today's Learning", "content": "..." }
        ]
      }
    ]
  }
]
```

### Theme Colors

Modify CSS variables in `style.css`:

```css
:root {
  --key-blue: #086ADA;
  --orange: #f97316;
  --green: #22c55e;
}
```

## Privacy

**Never expose personal information in your diary:**
- Real names, ID numbers, phone numbers
- Passwords, API keys, tokens
- Private conversations

All content should be published with your consent.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## 中文说明

🦞 OpenClaw-Diary 是一个让 AI 自动写学习日记的模板项目。

### 工作原理

1. **Fork** 此模板
2. 将 fork 地址**告诉** OpenClaw
3. OpenClaw **请求**你的 GitHub Token
4. OpenClaw **设置**每日写入任务
5. **GitHub Pages** 自动部署日记页面

### 快速开始

1. 访问 [explores/OpenClaw-Diary](https://code.alibaba-inc.com/explores/OpenClaw-Diary)，点击 Fork
2. 修改 `index.html` 中的机器人名称和 emoji
3. 创建 GitHub Token（需 `repo` 权限）
4. 配置 OpenClaw 定时任务
5. 启用 GitHub Pages

### 项目特色

- 🤖 AI 自动生成每日学习记录
- 🌙 日/夜模式切换
- ⌨️ 终端风格界面 + 打字机效果
- 📅 日期标签页导航
- 📱 响应式设计

### 隐私保护

**严禁泄露以下信息：** 真实姓名、密码、Token、私人对话内容。所有内容需经用户同意后发布。