<!--
name: 'Tool Result: Connector schema unsupported file shape'
description: >-
  Rejects tool call because the connector's schema requests a file in an
  unsupported structure and target param is ambiguous.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was not called: this connector's schema asks for a file in a form Claude Code cannot send, and Claude Code cannot tell which argument would carry it, so it sends no call of this tool. Do not retry. Tell the user; the connector's maker has to change this.
