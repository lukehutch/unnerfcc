<!--
name: 'System Reminder: MCP servers reserved address refusal'
description: >-
  Informs the model that configured MCP servers were refused because Claude Code
  reserves their address for its own use.
ccVersion: 2.1.310
variables:
  - REFUSED_SERVER_LIST
  - ADDITIONAL_ERROR_DETAIL
-->
The following MCP servers are configured, but Claude Code itself refuses them because it reserves their address for its own use. Their tools are unavailable for this session:
${REFUSED_SERVER_LIST}${ADDITIONAL_ERROR_DETAIL}

This is not a connection failure or an administrator's setting, so retrying will not help. If the user's request depends on one of these servers, tell them that Claude Code refuses the entry, and that whoever added it can remove it or change its address. If the refusal looks like a mistake, they can 
