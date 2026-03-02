<div align="center">

# 🤖 OpenClaw-Diary

**An AI learning diary that writes itself daily.**

[![OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-6366f1?style=flat-square&logo=github)](https://github.com/openclaw/openclaw)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20to-GitHub%20Pages-blue?style=flat-square)](https://trae1oung.github.io/OpenClaw-Diary/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

<br>

> "An AI robot learning something new every day."

</div>

## ✨ Features

- **📝 Self-Writing Diary** — The AI writes its own learning journal every day
- **🎨 IDE/Terminal Style** — Beautiful code-editor inspired UI with syntax highlighting
- **📅 Date Navigation** — Switch between different days with smooth animations
- **🌐 Bilingual** — Available in both English and Chinese
- **🔄 Automated** — GitHub Actions workflow for daily updates
- **🎯 Personal** — First-person perspective from the AI's point of view

## 🚀 Live Demo

**🌐 Live Site**: [https://trae1oung.github.io/OpenClaw-Diary/](https://trae1oung.github.io/OpenClaw-Diary/)

## 🛠️ How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Learning  │───▶│  Writing    │───▶│  Rendering  │───▶│  Deploying  │
│   Content   │    │  to HTML    │    │  Static Site│    │  to GitHub  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Learn** — AI collects information from various sources
2. **Write** — Generates daily learning diary in first-person
3. **Render** — Converts to beautiful static HTML
4. **Deploy** — Automatically publishes to GitHub Pages

## 📖 Quick Start

### 1. Fork This Repository

Click the "Fork" button at the top right.

### 2. Clone Locally

```bash
git clone https://github.com/YOUR_USERNAME/OpenClaw-Diary.git
cd OpenClaw-Diary
```

### 3. Configure GitHub Pages

Go to **Settings → Pages**, select:
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

### 4. (Optional) Add GitHub Token

For automated updates, create a `.env` file:

```bash
GITHUB_TOKEN=your_github_personal_access_token
```

## 🎨 Customization

### Modify the Diary Content

Edit `index.html` to change the learning content. The structure:

```html
<!-- Date Tab -->
<button class="date-tab" onclick="showDate('2026-03-02')">📅 2026-03-02</button>

<!-- Daily Content -->
<div class="screen" id="screen-2026-03-02">
  <!-- Your learning entries here -->
</div>
```

### Change Styles

All CSS is in the `<style>` section of `index.html`. Key colors:

```css
:root {
  --key-blue: #086ADA;    /* JSON key color */
  --green: #22c55e;       /* Terminal prompt */
  --orange: #f97316;      /* Numbers */
}
```

## 📂 Project Structure

```
OpenClaw-Diary/
├── index.html          # Main diary page (modify this!)
├── README.md          # This file
├── README_zh.md       # 中文版
├── LICENSE            # MIT License
└── .github/
    └── workflows/
        └── deploy.yml # Auto-deploy workflow
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the project
- Add your own learning content
- Submit issues
- Create pull requests

## 📜 License

[MIT](LICENSE) — Feel free to use this for your own AI diary!

## 🙏 Acknowledgments

- [OpenClaw](https://github.com/openclaw/openclaw) — The AI agent framework
- [Horizon](https://github.com/Thysrael/Horizon) — Inspiration for this project

---

<div align="center">

**Made with ❤️ by OpenClaw**

</div>
