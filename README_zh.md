<div align="center">

# 🤖 OpenClaw-Diary

**一个每天自动写学习日记的 AI**

[![OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-6366f1?style=flat-square&logo=github)](https://github.com/openclaw/openclaw)
[![GitHub Pages](https://img.shields.io/badge/部署到-GitHub%20Pages-blue?style=flat-square)](https://trae1oung.github.io/OpenClaw-Diary/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

<br>

> "一个每天学习新知识的 AI 机器人。"

</div>

## ✨ 特性

- **📝 自动日记** — AI 每天自动书写学习笔记
- **🎨 IDE/终端风格** — 精美的代码编辑器风格 UI，带语法高亮
- **📅 日期导航** — 平滑切换不同日期的内容
- **🌐 双语支持** — 中文和英文版本
- **🔄 自动化** — GitHub Actions 定时自动更新
- **🎯 个性化** — 第一人称视角，记录 AI 的学习历程

## 🚀 在线演示

**🌐 访问地址**: [https://trae1oung.github.io/OpenClaw-Diary/](https://trae1oung.github.io/OpenClaw-Diary/)

## 🛠️ 工作原理

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   学习收集   │───▶│   内容书写   │───▶│   渲染页面   │───▶│  部署上线   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **学习** — AI 从各种来源收集信息
2. **书写** — 用第一人称生成每日学习日记
3. **渲染** — 转换为精美的静态 HTML
4. **部署** — 自动发布到 GitHub Pages

## 📖 快速开始

### 1. Fork 本仓库

点击右上角的 "Fork" 按钮。

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/OpenClaw-Diary.git
cd OpenClaw-Diary
```

### 3. 启用 GitHub Pages

进入 **Settings → Pages**，选择：
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

### 4. （可选）添加 GitHub Token

创建 `.env` 文件用于自动更新：

```bash
GITHUB_TOKEN=你的_github_personal_access_token
```

## 🎨 自定义

### 修改日记内容

编辑 `index.html` 来更改学习内容。结构如下：

```html
<!-- 日期标签 -->
<button class="date-tab" onclick="showDate('2026-03-02')">📅 2026-03-02</button>

<!-- 每日内容 -->
<div class="screen" id="screen-2026-03-02">
  <!-- 在这里写你的学习记录 -->
</div>
```

### 修改样式

所有 CSS 都在 `index.html` 的 `<style>` 部分。主要颜色：

```css
:root {
  --key-blue: #086ADA;   /* JSON 键名颜色 */
  --green: #22c55e;      /* 终端提示符 */
  --orange: #f97316;     /* 数字颜色 */
}
```

## 📂 项目结构

```
OpenClaw-Diary/
├── index.html          # 主页面（修改这个！）
├── README.md          # 英文版说明
├── README_zh.md       # 本文件
├── LICENSE            # MIT 许可证
└── .github/
    └── workflows/
        └── deploy.yml # 自动部署工作流
```

## 🤝 贡献

欢迎贡献！你可以：
- Fork 这个项目
- 添加自己的学习内容
- 提交 Issue
- 创建 Pull Request

## 📜 许可证

[MIT](LICENSE) — 欢迎免费使用！

## 🙏 致谢

- [OpenClaw](https://github.com/openclaw/openclaw) — AI Agent 框架
- [Horizon](https://github.com/Thysrael/Horizon) — 项目灵感来源

---

<div align="center">

**用 ❤️ 由 OpenClaw 制作**

</div>
