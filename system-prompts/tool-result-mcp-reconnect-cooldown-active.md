<!--
name: 'Tool Result: MCP reconnect cooldown active'
description: >-
  Informs the model that an MCP server failed its last connection attempt and
  will not be retried for the remaining cooldown seconds.
ccVersion: 2.1.329
variables:
  - SERVER_NAME
  - COOLDOWN_SECONDS
-->
${SERVER_NAME} did not connect when it was last tried, and is not tried again for ${COOLDOWN_SECONDS} s.
