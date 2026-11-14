<!--
name: 'System Reminder: MCP servers refused by network proxy'
description: >-
  Informs the model which configured MCP servers are blocked by the session's
  network proxy policy and instructs telling the user they are unavailable.
ccVersion: 2.1.325
variables:
  - REFUSED_SERVERS_LIST
  - ADDITIONAL_SERVERS_SUFFIX
-->
The following MCP servers are configured, but this session's network proxy refuses them by policy. Their tools are unavailable for this session:
${REFUSED_SERVERS_LIST}${ADDITIONAL_SERVERS_SUFFIX}

This is not a sign-in problem or a connection failure: authorizing or retrying will not help. If the user's request depends on one of these servers, tell them it is not available from this session.
