<!--
name: 'System Reminder: MCP servers blocked by managed policy'
description: >-
  Tells the model that listed MCP servers are blocked administratively, so their
  tools are unavailable and retrying will not help.
ccVersion: 2.1.219
variables:
  - BLOCKED_SERVER_LIST
  - ADDITIONAL_BLOCKED_SERVERS_NOTE
-->
 Note: these configured MCP servers are blocked by the organization's managed policy, so their tools are unavailable: ${BLOCKED_SERVER_LIST}${ADDITIONAL_BLOCKED_SERVERS_NOTE}. This is an administrative block, not a connection failure — retrying will not help; an administrator manages this setting.
