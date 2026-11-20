<!--
name: 'Tool Result: Desktop local session requires bracketed ref'
description: >-
  Tool result note explaining that a Claude Desktop session printed with a
  [local_...] ref must be addressed with both its name and brackets.
ccVersion: 2.1.329
variables:
  - LIST_AGENTS_TOOL_NAME
-->

A Claude Desktop session that ${LIST_AGENTS_TOOL_NAME} prints as "name [local_…]" is not found by its name alone: send to the name and brackets as printed.
