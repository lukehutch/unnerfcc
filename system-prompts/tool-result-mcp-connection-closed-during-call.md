<!--
name: 'Tool Result: MCP connection closed during call'
description: >-
  Informs that an MCP connection closed during a call, instructing reconnect and
  checking side effects.
ccVersion: 2.1.310
variables:
  - SERVER_NAME
  - EXTRA_NOTE
-->
MCP connection to ${SERVER_NAME} closed during the call — send mcp_reconnect, and check whether the tool ran before retrying${EXTRA_NOTE}
