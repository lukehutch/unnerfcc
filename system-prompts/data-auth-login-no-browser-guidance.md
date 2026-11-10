<!--
name: 'Data: Auth login no browser guidance'
description: >-
  Reference instructions for logging in without a browser over SSH or remote
  cloud sessions.
ccVersion: 2.1.321
-->
- **No browser on this machine:** over SSH they run `ant auth login --no-browser` in a terminal of their own on that host (`!` and your own commands get no keyboard input). Where they have only this chat (Claude Code on the web, `CLAUDE_CODE_REMOTE=true`), don't start a login: they set `ANTHROPIC_API_KEY` in the settings of a cloud environment only they use, then start a new session.
