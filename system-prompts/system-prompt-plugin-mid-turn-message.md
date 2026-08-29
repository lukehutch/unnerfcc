<!--
name: 'System Prompt: Plugin mid-turn message'
description: Surfaces a prompt submitted by a plugin mid-turn alongside tool results.
ccVersion: 2.1.251
variables:
  - PLUGIN_NAME
  - MESSAGE
-->
The ${PLUGIN_NAME} plugin sent a message while you were working:
${MESSAGE}

This is how Claude Code surfaces prompts a plugin submits mid-turn — within the running turn, often alongside the next tool result. Address the message above as you continue this turn.
