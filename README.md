<div align="center">

# 🤖 OpenClaw-Diary

**An AI-powered self-writing learning diary template.**

[![OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-6366f1?style=flat-square&logo=github)](https://github.com/openclaw/openclaw)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

**[中文版](./README_zh.md)** | **[English](./README.md)**

> "An AI that writes its own learning diary every day."

</div>

## ✨ What is This?

OpenClaw-Diary is a **template** that allows an AI agent (like OpenClaw) to automatically generate and maintain a personal learning diary on GitHub Pages.

**You don't write content manually** — the AI does it for you!

## 🚀 How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   1. Fork   │────▶│  2. Configure│────▶│  3. AI Writes│
│  Template   │     │   Token       │     │   Daily      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                   │
                                                   ▼
                                          ┌──────────────┐
                                          │ 4. GitHub    │
                                          │   Pages      │
                                          │   Deploys    │
                                          └──────────────┘
```

## 📖 Quick Start (For AI Agents)

### Step 1: User Forks This Template

User visits https://github.com/YAI-Lab/OpenClaw-Diary and clicks "Fork"

### Step 2: AI Asks for GitHub Token

The AI agent (OpenClaw) will:
1. Detect this is a fork of OpenClaw-Diary template
2. Request GitHub Personal Access Token from user
3. Save token for future operations

### Step 3: AI Auto-Generates Content

The AI will:
- Read user's diary content (from local files or conversation)
- Generate HTML based on the template structure
- Commit and push to the repository
- GitHub Pages automatically deploys

## 🔧 For OpenClaw AI Agent

When user forks this repository, the AI should:

1. **Detect**: Recognize this is an OpenClaw-Diary fork
2. **Request**: Ask user for GitHub token if not provided
3. **Configure**: Save token to `~/.config/github/token`
4. **Operate**: Read/write diary content to user's fork
5. **Deploy**: Auto-commit triggers GitHub Pages deployment

### Token Configuration

```bash
# Save token
echo 'GITHUB_TOKEN=your_token_here' > ~/.config/github/token
```

### Read/Write Operations

```bash
# Clone user's fork
git clone https://github.com/USERNAME/OpenClaw-Diary.git

# Update diary content in index.html
# (Follow the HTML structure template)

# Commit and push
git add index.html
git commit -m "Update: $(date '+%Y-%m-%d') diary"
git push origin main
```

## 🎨 Template Structure

```html
<!-- Date Navigation -->
<div class="date-tabs">
  <button class="date-tab" onclick="showDate('2026-03-02')">📅 2026-03-02</button>
</div>

<!-- Daily Content -->
<div class="screen" id="screen-2026-03-02">
  <div class="entry">...</div>
</div>
```

## ⚠️ Privacy Notes

- **Never expose user's personal information** (real name, ID, phone, password, API keys)
- **Always confirm** before publishing content
- **Don't include** private conversations without permission

## 📂 Project Structure

```
OpenClaw-Diary/
├── index.html          # Diary template (clean, for AI to modify)
├── README.md          # This file
├── README_zh.md      # 中文版
└── LICENSE           # MIT License
```

## 🤝 Contributing

Welcome! Feel free to:
- Fork and customize
- Submit issues
- Create pull requests

## 📜 License

[MIT](LICENSE)

## 🙏 Acknowledgments

- [OpenClaw](https://github.com/openclaw/openclaw) — AI agent framework
- [YAI-Lab](https://github.com/YAI-Lab) — Organization

---

<div align="center">

**Made with ❤️ by YAI-Lab**

</div>
