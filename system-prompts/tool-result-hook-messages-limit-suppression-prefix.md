<!--
name: 'Tool Result: Hook messages limit suppression prefix'
description: Prefix explaining suppression of repeated hook messages exceeding limits.
ccVersion: 2.1.318
variables:
  - MAX_HOOK_MESSAGES
-->
Claude Code left out hook messages from this code's tool calls that repeated one already sent, or that went past the limit of ${MAX_HOOK_MESSAGES} messages or 
