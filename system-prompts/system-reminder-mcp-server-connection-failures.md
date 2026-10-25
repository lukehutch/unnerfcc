<!--
name: 'System Reminder: MCP server connection failures'
description: >-
  Reports which configured MCP servers failed to connect so the model treats
  their tools as unavailable rather than nonexistent.
ccVersion: 2.1.310
variables:
  - SESSION_SCOPE_OR_RETRY_NOTE
  - FAILED_SERVER_LIST
  - ADDITIONAL_ERROR_DETAIL
-->
The following MCP servers are configured but failed to connect — their tools (typically named mcp__<server>__*) are unavailable ${SESSION_SCOPE_OR_RETRY_NOTE}:
${FAILED_SERVER_LIST}${ADDITIONAL_ERROR_DETAIL}
