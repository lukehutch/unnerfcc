<!--
name: 'System Reminder: MCP proxy refused servers inline note'
description: >-
  Inline note informing the model that configured MCP servers are refused by the
  session's network proxy policy and retrying will not help.
ccVersion: 2.1.325
variables:
  - REFUSED_SERVERS_LIST
  - ADDITIONAL_SERVERS_SUFFIX
-->
 Note: this session's network proxy refuses these configured MCP servers by policy, so their tools are unavailable: ${REFUSED_SERVERS_LIST}${ADDITIONAL_SERVERS_SUFFIX}. This is not a sign-in problem or a connection failure, so authorizing or retrying will not help.
