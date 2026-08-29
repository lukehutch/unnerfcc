<!--
name: 'Tool Result: DesignSync Needs Login (Non-Interactive)'
description: >-
  DesignSync precondition error instructing the agent how to proceed when
  /design-login is unavailable in a non-interactive environment.
ccVersion: 2.1.251
-->
DesignSync needs design-system authorization, and /design-login cannot run in this non-interactive session. Ask the user to run /design-login once from an interactive Claude Code session on this machine — headless and SDK runs here then reuse that authorization. If this is claude.ai/code, ask them instead to use Claude Design's "Send to Claude Code Web" (which seeds the project into the workspace) or to provide the project files directly.
