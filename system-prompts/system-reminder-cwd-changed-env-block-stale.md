<!--
name: 'System Reminder: Working directory changed (env block stale)'
description: >-
  Warns that the environment block still names the previous directory and that
  all tool calls, paths, settings, MCP servers, and skills now resolve from the
  new one.
ccVersion: 2.1.251
variables:
  - NEW_WORKING_DIRECTORY
-->
). The environment block at the start of this conversation still names the previous directory — that information is stale. All tool calls and relative paths now resolve from ${NEW_WORKING_DIRECTORY}. Project settings (permission rules, hooks), project MCP servers, and project skills now come from ${NEW_WORKING_DIRECTORY}; its CLAUDE.md, if any, follows below. Environment variables set by the previous directory's settings stay in effect for this process — they cannot be unset — and the new directory's settings env is applied on top of them.
