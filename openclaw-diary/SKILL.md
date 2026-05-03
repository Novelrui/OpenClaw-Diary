---
name: openclaw-diary
version: 1.1.0
description: |
  Set up and manage OpenClaw auto learning diary. Used for:
  (1) Help users fork OpenClaw-Diary repository
  (2) Connect the forked repo to OpenClaw
  (3) Configure daily cron task to auto-write diary
  (4) Deploy to GitHub Pages
---

# 🦞 OpenClaw-Diary Setup Guide

Help users set up OpenClaw auto learning diary with this complete workflow.

## ⚠️ Important: Language Response

**Always respond in the same language as the user is speaking!**
- If user writes in Chinese → respond in Chinese
- If user writes in English → respond in English
- Detect language from user's message and match it

## Trigger Conditions

Activate when user mentions:
- "setup diary" / "设置日记"
- "fork OpenClaw-Diary"
- "auto write diary" / "自动写日记"
- "daily learning log" / "每日学习记录"
- "let AI write diary" / "让 AI 写日记"

## Prerequisites

| Requirement | Version | Verification |
|-------------|---------|-------------|
| Git | 2.0+ | `git --version` |
| GitHub account | - | `gh auth status` |
| GitHub Token | classic | See Step 4 |
| curl / jq | any | `curl --version && jq --version` |

## Complete Workflow

### Step 1: Guide User to Fork the Repo

Tell user to fork on GitHub:

```
Please fork the repo:
1. Visit https://code.alibaba-inc.com/explores/OpenClaw-Diary
2. Click "Fork" button
3. Select your account, complete fork
```

### Step 2: Get User's Fork URL

Ask for the forked repo URL, format:
```
https://github.com/your-username/OpenClaw-Diary
```

### Step 3: Modify index.html for Personalization (IMPORTANT!)

**After cloning the repo, MUST modify:**

1. **Change page title**: Replace placeholder text in `index.html`
2. **Update diary-data.json**: Customize the `config` section (title, subtitle, footer)
3. **Replace robot emoji**: Change 🦞 to user's preferred emoji

```bash
# Clone repo
git clone https://github.com/username/OpenClaw-Diary.git
cd OpenClaw-Diary

# Edit config in diary-data.json
# Change "title", "subtitle", "footerText" fields
```

**Example diary-data.json config:**
```json
{
  "config": {
    "title": "小龙的学习日记",
    "subtitle": "每天进步一点点",
    "filename": "xiaolong-diary.json",
    "footerText": "🤖 由 OpenClaw AI 自动生成",
    "footerLink": { "text": "OpenClaw", "url": "https://github.com/openclaw" }
  }
}
```

### Step 4: Get GitHub Token

If GitHub token not configured, user needs to create:

1. Visit https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Check `repo` permission
4. Generate and save token

**Required token scopes:**

| Scope | Access | Why needed |
|-------|--------|-----------|
| `repo` | Full control of private repositories | Push diary content to repo |
| `repo:status` | Commit status | Enable GitHub Pages deployment |
| `public_repo` | Public repositories | If using public repo only |

**Important**: Must tell user the purpose when getting token, and how to revoke.

### Step 5: Configure Daily Cron Task

Use cron or heartbeat to configure daily task:

**Method A: Cron Task**
```bash
# Run daily at UTC 1:00 (9:00 Beijing time)
openclaw cron add "0 1 * * *" "Daily Learning Diary" "Read latest AI news, track GitHub stars, generate report and push to OpenClaw-Diary repo"
```

**Method B: Heartbeat Task**
Add to HEARTBEAT.md:
```markdown
## Daily Learning Report
- Research latest AI/tech/politics news
- Track GitHub repo stars growth (if user has repos)
- Generate report in user's language
- Push to OpenClaw-Diary
```

### Track GitHub Stars Growth

As part of the daily report, optionally track GitHub stars:

```bash
# Get current stars
curl -s https://api.github.com/repos/owner/repo | jq '.stargazers_count'

# Track daily growth
# Store in a simple JSON file or append to diary
```

### Step 6: Push to Repo

```bash
# Add remote
git remote add user https://github.com/username/OpenClaw-Diary.git

# Commit changes
git add diary-data.json
git commit -m "docs: $(date '+%Y-%m-%d') learning diary"
git push user main
```

### Step 7: Enable GitHub Pages

1. Go to user's forked repo
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main, folder: / (root)
5. Save, wait for deployment

## Error Handling

| Error | Cause | Solution |
|-------|-------|---------|
| `403 Forbidden` | Token lacks `repo` scope | Regenerate token with correct scope |
| `404 Not Found` | Repo not found or private | Verify fork URL, check token access |
| `Deployment failed` | Pages not configured | Check Settings → Pages, ensure main branch |
| `curl: command not found` | Missing dependencies | `apt install curl jq` or `brew install curl jq` |
| Empty diary | JSON parse error | Validate `diary-data.json` with `jq . diary-data.json` |

## Verification Checklist

After setup, confirm:

- [ ] User forked repo
- [ ] Got fork URL
- [ ] Modified `diary-data.json` config section
- [ ] Got GitHub Token with `repo` scope
- [ ] Configured daily task (cron or heartbeat)
- [ ] GitHub Pages enabled and accessible
- [ ] Test push successful: `git push` returns no errors
- [ ] Pages URL loads: `https://username.github.io/OpenClaw-Diary/`

## Diary Data Format

Content is stored in `diary-data.json`. To add a new day, append to the `days` array:

```json
{
  "date": "YYYY-MM-DD",
  "entries": [
    {
      "filename": "~/YYYY-MM-DD/learning.md",
      "status": "modified",
      "sections": [
        {
          "type": "quote",
          "title": "💡 Today's Learning",
          "content": "<p>Your learning content...</p>"
        },
        {
          "type": "terminal",
          "command": "echo 'Hello World'"
        },
        {
          "type": "key-value",
          "items": [
            { "key": "\"skill\"", "value": "\"new-thing\"", "comment": "", "valueType": "string" }
          ]
        }
      ]
    }
  ]
}
```

**Section types:**
- `quote` — Blue-bordered quote box with title and HTML content
- `long-text` — Free-form HTML text block
- `terminal` — Terminal command prompt display
- `key-value` — Code-style key-value pairs (like JSON)

## Privacy Protection (MUST FOLLOW)

**Strictly prohibit leaking:**
- User's real name, ID card, phone number
- User's password, API Key, Token
- User's private conversation content

**Operating principles:**
- All content must be published with user consent
- When uncertain, ask user first

## Configuration

| Config | Description | How to Get |
|--------|-------------|------------|
| FORK_URL | User's forked repo | User provides |
| GITHUB_TOKEN | GitHub PAT (classic) with `repo` scope | User creates at settings/tokens |
| CRON_SCHEDULE | Task schedule | Default UTC 1:00 |