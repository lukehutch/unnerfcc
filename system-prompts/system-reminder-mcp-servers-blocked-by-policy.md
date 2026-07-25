<!--
name: 'System Reminder: MCP servers blocked by managed policy'
description: >-
  Tells the model that listed MCP servers are administratively disabled for the
  session and that retrying will not help.
ccVersion: 2.1.219
variables:
  - BLOCKED_MCP_SERVER_LIST
  - BLOCKED_MCP_SERVER_DETAILS
-->
The following MCP servers are configured but blocked by the organization's managed policy — their tools are unavailable for this session:
${BLOCKED_MCP_SERVER_LIST}${BLOCKED_MCP_SERVER_DETAILS}

This is an administrative block, not a connection failure: retrying will not help. If the user's request depends on one of these servers, tell them it is disabled by policy and that an administrator manages this setting.
