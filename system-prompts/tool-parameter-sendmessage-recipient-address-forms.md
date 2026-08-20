<!--
name: 'Tool Parameter: SendMessage recipient address forms'
description: >-
  Recipient field of the message-sending tool — a name from the agent listing
  (with its ref only when one is shown), a teammate name, main, or a background
  agent's agentId.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->
Recipient: a name from ${LIST_AGENTS_TOOL_NAME} (append its " [ref]" only when a listing or an error shows one), a teammate name, "main", or a background agent's agentId
