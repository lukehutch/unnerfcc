<!--
name: 'System Reminder: MCP server tools list failed'
description: >-
  Informs the model that connected MCP servers failed to list their tools,
  instructing it not to conclude they lack capabilities and to inform the user
  if needed.
ccVersion: 2.1.329
variables:
  - SERVER_LIST
  - RECONNECT_GUIDANCE
-->
The following MCP servers are connected, but listing their tools failed — their tools (typically named mcp__<server>__*) are unavailable for now:
${SERVER_LIST}${RECONNECT_GUIDANCE}

Treat this as a failure to load their tools, not a missing capability — do not conclude the server has no tools. If the user's request depends on one of these servers, tell them that this server's tools could not be loaded.
