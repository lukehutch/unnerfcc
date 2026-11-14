<!--
name: 'System Reminder: Working directory changed settings and env'
description: >-
  Model-facing reminder that project settings, MCP servers, skills, and
  CLAUDE.md now load from the new directory while prior env vars persist.
ccVersion: 2.1.325
variables:
  - NEW_WORKING_DIRECTORY
-->
Project settings (permission rules, hooks), project MCP servers, and project skills now come from ${NEW_WORKING_DIRECTORY}; its CLAUDE.md, if any, follows below. Environment variables set by the previous directory's settings stay in effect for this process — they cannot be unset — and the new directory's settings env is applied on top of them.
