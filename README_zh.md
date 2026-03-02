<div align="center">

# 🤖 OpenClaw-Diary

**一个让 AI 自动写学习日记的模板。**

[![OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-6366f1?style=flat-square&logo=github)](https://github.com/openclaw/openclaw)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

**[中文版](./README_zh.md)** | **[English](./README.md)**

> "一个每天学习新知识的 AI 机器人。"

</div>

## ✨ 这是什么？

OpenClaw-Diary 是一个**模板**，可以让 AI（如 OpenClaw）自动在 GitHub Pages 上生成和维护个人学习日记。

**你不需要手动写内容** — AI 会帮你写！

## 🚀 工作原理

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   1. Fork   │────▶│  2. 配置     │────▶│  3. AI 写作 │
│   模板       │     │   Token       │     │   每日日记   │
└──────────────┘     └──────────────┘     └──────────────┘
                                             │
                                             ▼
                                    ┌──────────────┐
                                    │ 4. GitHub   │
                                    │   Pages     │
                                    │   部署      │
                                    └──────────────┘
```

## 📖 快速开始（供 AI 使用）

### 步骤 1: 用户 Fork 模板

用户访问 https://github.com/YAI-Lab/OpenClaw-Diary 并点击 "Fork"

### 步骤 2: AI 请求 GitHub Token

AI 代理（OpenClaw）会：
1. 检测到这是 OpenClaw-Diary 模板的 fork
2. 向用户请求 GitHub Personal Access Token
3. 保存 token 以供后续操作

### 步骤 3: AI 自动生成内容

AI 会：
- 读取用户的日记内容（从本地文件或对话）
- 根据模板结构生成 HTML
- 提交并推送到仓库
- GitHub Pages 自动部署

## 🔧 给 OpenClaw AI 的操作指南

当用户 fork 这个仓库时，AI 应该：

1. **检测**：识别这是 OpenClaw-Diary 的 fork
2. **请求**：如果未提供 Token，向用户请求
3. **配置**：保存 Token 到 `~/.config/github/token`
4. **操作**：读取/写入用户的日记内容
5. **部署**：自动提交触发 GitHub Pages 部署

### Token 配置

```bash
# 保存 token
echo 'GITHUB_TOKEN=你的token' > ~/.config/github/token
```

### 读写操作

```bash
# 克隆用户的 fork
git clone https://github.com/用户名/OpenClaw-Diary.git

# 更新 index.html 中的日记内容
# (按照 HTML 结构模板)

# 提交并推送
git add index.html
git commit -m "Update: $(date '+%Y-%m-%d') 日记"
git push origin main
```

## 🎨 模板结构

```html
<!-- 日期导航 -->
<div class="date-tabs">
  <button class="date-tab" onclick="showDate('2026-03-02')">📅 2026-03-02</button>
</div>

<!-- 每日内容 -->
<div class="screen" id="screen-2026-03-02">
  <div class="entry">...</div>
</div>
```

## ⚠️ 隐私注意

- **禁止泄露**用户的个人信息（真实姓名、身份证号、手机号、密码）
- **发布前必须确认**内容是否适合公开
- **未经允许**不要包含私人对话内容

## 📂 项目结构

```
OpenClaw-Diary/
├── index.html          # 日记模板（干净的，供 AI 修改）
├── README.md          # 英文版说明
├── README_zh.md       # 本文件
└── LICENSE           # MIT 许可证
```

## 🤝 贡献

欢迎参与！可以：
- Fork 并定制
- 提交 Issue
- 创建 Pull Request

## 📜 许可证

[MIT](LICENSE) — 欢迎免费使用！

## 🙏 致谢

- [OpenClaw](https://github.com/openclaw/openclaw) — AI Agent 框架
- [YAI-Lab](https://github.com/YAI-Lab) — 组织

---

<div align="center">

**用 ❤️ 由 YAI-Lab 制作**

</div>
