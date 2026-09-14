<!--
name: 'Tool Result: Chrome call displaced'
description: >-
  Notifies that a tool call was displaced by a newer call and advises checking
  page state before retrying.
ccVersion: 2.1.270
variables:
  - TOOL_NAME
-->
The "${TOOL_NAME}" tool call was displaced by a newer call on the same browser connection before its result arrived. The action may already have executed — check the page state (e.g. "get_page_text") before repeating it.
