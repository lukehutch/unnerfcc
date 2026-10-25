<!--
name: 'System Reminder: MCP servers reserved address'
description: >-
  Informs the model that configured MCP servers were refused because Claude Code
  reserves their address for internal use.
ccVersion: 2.1.310
variables:
  - SERVER_LIST
  - EXTRA_DETAILS
-->
 Note: Claude Code itself refuses these configured MCP servers because it reserves their address for its own use, so their tools are unavailable: ${SERVER_LIST}${EXTRA_DETAILS}. This is not a connection failure or an administrator's setting, so retrying will not help; whoever added the entry can remove it or change its address.
