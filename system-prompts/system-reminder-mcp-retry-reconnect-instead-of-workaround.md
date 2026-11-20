<!--
name: 'System Reminder: MCP retry reconnect instead of workaround'
description: >-
  Advises retrying connection to a temporarily unreachable MCP server with waits
  instead of reaching it another way.
ccVersion: 2.1.329
variables:
  - RECONNECT_ACTION
-->
for now; ${RECONNECT_ACTION}, with waits between tries, so try that instead of reaching the server another way
