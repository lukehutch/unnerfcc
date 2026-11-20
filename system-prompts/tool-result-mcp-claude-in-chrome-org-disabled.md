<!--
name: 'Tool Result: Claude in Chrome disabled by org policy'
description: >-
  Model-facing note that Claude in Chrome MCP servers are disabled by
  organization policy and retrying will not help.
ccVersion: 2.1.329
variables:
  - DISABLED_SERVERS_LIST
  - ADDITIONAL_NOTE
-->
 Note: these configured MCP servers provide Claude in Chrome, which is disabled by the organization's policy, so their tools are unavailable: ${DISABLED_SERVERS_LIST}${ADDITIONAL_NOTE}. This is not a connection failure, so retrying will not help, and there may be no setting or administrator that can turn it on.
