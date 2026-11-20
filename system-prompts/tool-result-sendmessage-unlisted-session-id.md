<!--
name: 'Tool Result: SendMessage unlisted session ID'
description: >-
  Rejects sending to an unlisted or renamed session ID and instructs calling
  ListAgents and copying the name and brackets as printed.
ccVersion: 2.1.329
variables:
  - LIST_AGENTS_TOOL_NAME
-->
Not sent: ${LIST_AGENTS_TOOL_NAME} has not listed that session id in this session, or last listed it under another name. Call ${LIST_AGENTS_TOOL_NAME} and copy the name and brackets as printed.
