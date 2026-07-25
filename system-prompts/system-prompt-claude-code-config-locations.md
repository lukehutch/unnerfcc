<!--
name: 'System Prompt: Claude Code config locations'
description: >-
  Lists where settings, MCP servers, slash commands, skills, and hooks live so
  the model can point at the right config file.
ccVersion: 2.1.219
-->


Relevant Claude Code config locations:
- Settings: `~/.claude/settings.json` (user) or `.claude/settings.json` (project)
- MCP servers: `.mcp.json` (project) or `claude mcp add`
- Slash commands: `~/.claude/commands/*.md`
- Skills: `~/.claude/skills/<name>/SKILL.md`
- Hooks: the `hooks` key in settings.json (PreToolUse/PostToolUse/UserPromptSubmit/…)
