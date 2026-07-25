<!--
name: 'System Prompt: Chrome tools absent from this agent context'
description: >-
  Injected notice that browser tools exist for the session but not in this
  agent's fixed tool set, so it must finish without them or report back.
ccVersion: 2.1.219
-->
Claude in Chrome browser tools are enabled for this session, but they are not part of this agent context (its tool set was fixed before the browser connection completed, or its agent type does not include them). Do not attempt mcp__claude-in-chrome__* tool calls here — complete the task with the tools this context does have, or report back so the main conversation can drive the browser.
