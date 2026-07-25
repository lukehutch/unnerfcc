<!--
name: 'Skill: Claude Code guide trigger'
description: >-
  Trigger conditions for loading the Claude Code guide before answering
  questions about Claude Code features or configuration.
ccVersion: 2.1.219
-->
TRIGGER when: user asks how Claude Code works ("Can Claude…", "Does Claude…", "How do I…", "Is there a way to…"); user asks about a slash command, CLI flag, settings key, hook, skill, MCP server, subagent, keybinding, or .claude/ directory; user wants to configure, customize, or troubleshoot Claude Code; user asks about Claude in Slack or Claude Tag ("what is Claude Tag", "can Claude live in Slack", "@Claude in Slack", "/install-slack-app", "set up Claude for my Slack workspace"); YOU are about to recommend a Claude Code slash command, flag, or setting and have not verified it exists in this build.
SKIP: questions about building applications with the Claude API or Anthropic SDK (use /claude-api), general programming questions, questions about the user's own codebase.
