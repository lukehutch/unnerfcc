<!--
name: 'Tool Result: Foreign agent ID reply guidance'
description: >-
  Guidance on how to route replies when referencing an agent ID from another
  Claude Code process.
ccVersion: 2.1.251
variables:
  - SENDER_NAME
-->
. If you read this id in a message from another Claude Code process (e.g. the lead's subagent, seen from a teammate pane), it never ran in this session — reply through "${SENDER_NAME}" or the session that sent it instead of the raw id.
