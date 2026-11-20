<!--
name: 'Tool Result: MCP servers tool listing failed'
description: >-
  Model-facing note that connected MCP servers failed to list their tools and
  should not be assumed to have none.
ccVersion: 2.1.329
variables:
  - FAILED_SERVERS_LIST
  - RECONNECT_NOTE
-->
 Note: these MCP servers are connected, but listing their tools failed, so their tools are unavailable for now: ${FAILED_SERVERS_LIST}${RECONNECT_NOTE}. Treat this as a failure to load their tools — do not conclude the server has no tools.
