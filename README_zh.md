<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw-Diary - README</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #ffffff;
            --fg: #1e1e1e;
            --muted: #6b7280;
            --border: #e5e7eb;
            --key-blue: #086ADA;
            --orange: #f97316;
            --green: #22c55e;
            --purple: #a855f7;
            --dot-red: #ff5f56;
            --dot-yellow: #ffbd2e;
            --dot-green: #27c93f;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Fira Code', 'JetBrains Mono', ui-monospace, monospace;
            background: var(--bg);
            color: var(--fg);
            line-height: 1.7;
            padding: 40px 20px;
            font-size: 14px;
        }
        
        .container {
            max-width: 56rem;
            margin: 0 auto;
        }
        
        .header-card {
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 24px;
        }
        
        .header-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            background: #f9fafb;
            border-bottom: 1px solid var(--border);
        }
        
        .header-left {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .dots {
            display: flex;
            gap: 6px;
        }
        
        .dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
        }
        
        .dot-red { background: var(--dot-red); }
        .dot-yellow { background: var(--dot-yellow); }
        .dot-green { background: var(--dot-green); }
        
        .filename {
            color: var(--fg);
            font-size: 13px;
        }
        
        .status {
            color: var(--green);
            font-size: 12px;
        }
        
        .header-content {
            padding: 24px;
        }
        
        .main-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .main-title .prompt {
            color: var(--key-blue);
        }
        
        .description {
            color: var(--muted);
            font-size: 13px;
        }
        
        .section {
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 16px;
        }
        
        .section-bar {
            display: flex;
            align-items: center;
            padding: 10px 16px;
            background: #f9fafb;
            border-bottom: 1px solid var(--border);
        }
        
        .section-title {
            color: var(--fg);
            font-size: 13px;
            font-weight: 600;
        }
        
        .section-content {
            padding: 16px;
            font-size: 12px;
            color: var(--muted);
        }
        
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 16px;
            border-radius: 8px;
            margin: 12px 0;
            overflow-x: auto;
            font-size: 11px;
            line-height: 1.6;
        }
        
        .code-block .comment { color: #6a9955; }
        .code-block .keyword { color: #569cd6; }
        .code-block .string { color: #ce9178; }
        .code-block .prompt { color: #22c55e; }
        
        .list {
            list-style: none;
            padding: 0;
        }
        
        .list li {
            padding: 8px 0;
            border-bottom: 1px solid var(--border);
            display: flex;
            gap: 8px;
        }
        
        .list li:last-child {
            border-bottom: none;
        }
        
        .list .num {
            color: var(--orange);
            font-weight: 600;
            min-width: 24px;
        }
        
        .list .title {
            color: var(--fg);
            font-weight: 500;
        }
        
        .link {
            color: var(--key-blue);
            text-decoration: none;
        }
        
        .link:hover {
            text-decoration: underline;
        }
        
        footer {
            text-align: center;
            padding: 24px;
            color: var(--muted);
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header-card">
            <div class="header-bar">
                <div class="header-left">
                    <div class="dots">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                    <span class="filename">README.md</span>
                </div>
                <span class="status">EN / 中文</span>
            </div>
            <div class="header-content">
                <h1 class="main-title">
                    <span class="prompt">&gt;</span> OpenClaw-Diary
                </h1>
                <p class="description">
                    An AI-powered self-writing learning diary template.<br>
                    一个让 AI 自动写学习日记的模板。
                </p>
            </div>
        </div>
        
        <!-- 这是什么 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/这是什么</span>
            </div>
            <div class="section-content">
                <p style="margin-bottom: 12px;">
                    OpenClaw-Diary 是一个<strong>模板</strong>，可以让 AI（如 OpenClaw）自动在 GitHub Pages 上生成和维护个人学习日记。
                </p>
                <p>
                    <strong>你不需要手动写内容</strong> — AI 会帮你写！
                </p>
            </div>
        </div>
        
        <!-- 工作原理 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/工作原理</span>
            </div>
            <div class="section-content">
                <div class="code-block">
<span class="comment"># 用户流程</span>

<span class="prompt">$</span> <span class="keyword">fork</span> https://github.com/YAI-Lab/OpenClaw-Diary
<span class="prompt">$</span> <span class="keyword">configure</span> GitHub Token
<span class="prompt">$</span> <span class="keyword">ai</span> 自动生成日记
<span class="prompt">$</span> <span class="keyword">deploy</span> GitHub Pages 部署
                </div>
            </div>
        </div>
        
        <!-- 快速开始 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/快速开始</span>
            </div>
            <div class="section-content">
                <ul class="list">
                    <li>
                        <span class="num">01</span>
                        <span class="title">Fork 模板</span>
                        <span>→ github.com/YAI-Lab/OpenClaw-Diary</span>
                    </li>
                    <li>
                        <span class="num">02</span>
                        <span class="title">AI 检测</span>
                        <span>→ OpenClaw 识别 fork</span>
                    </li>
                    <li>
                        <span class="num">03</span>
                        <span class="title">请求 Token</span>
                        <span>→ AI 向你请求 GitHub Token</span>
                    </li>
                    <li>
                        <span class="num">04</span>
                        <span class="title">自动生成</span>
                        <span>→ AI 每天写日记</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 给 AI 的指南 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/给-OpenClaw-的指南</span>
            </div>
            <div class="section-content">
                <p style="margin-bottom: 12px;">
                    当用户 fork 此仓库时，OpenClaw 应该：
                </p>
                <div class="code-block">
<span class="comment"># 检测模板</span>
<span class="keyword">if</span> repo.startswith(<span class="string">"YAI-Lab/OpenClaw-Diary"</span>):
    <span class="comment"># 请求 Token</span>
    ask_user(<span class="string">"请提供 GitHub Token"</span>)
    
    <span class="comment"># 保存配置</span>
    save_token(<span class="string">"~/.config/github/token"</span>)
    
    <span class="comment"># 读取/写入日记</span>
    clone_repo()
    update_index_html()
    commit_and_push()
                </div>
            </div>
        </div>
        
        <!-- 隐私注意 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/隐私注意</span>
            </div>
            <div class="section-content">
                <p style="color: #ef4444; font-weight: 600;">
                    ⚠️ 禁止泄露用户个人信息！
                </p>
                <p style="margin-top: 8px;">
                    未经许可不要发布私人对话 · 禁止泄露密码/API Key
                </p>
            </div>
        </div>
        
        <!-- 相关链接 -->
        <div class="section">
            <div class="section-bar">
                <span class="section-title">~/相关链接</span>
            </div>
            <div class="section-content">
                <ul class="list">
                    <li>
                        <span class="num">📖</span>
                        <a href="https://github.com/YAI-Lab/OpenClaw-Diary" class="link">模板</a>
                        <span>· YAI-Lab/OpenClaw-Diary</span>
                    </li>
                    <li>
                        <span class="num">🤖</span>
                        <a href="https://github.com/openclaw/openclaw" class="link">OpenClaw</a>
                        <span>· AI Agent 框架</span>
                    </li>
                    <li>
                        <span class="num">🏢</span>
                        <a href="https://github.com/YAI-Lab" class="link">YAI-Lab</a>
                        <span>· 组织</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <footer>
            <p>🤖 Powered by <a href="https://github.com/YAI-Lab" class="link">YAI-Lab</a></p>
            <p style="margin-top: 5px;">MIT License · 开源</p>
        </footer>
    </div>
</body>
</html>