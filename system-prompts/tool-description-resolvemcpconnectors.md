<!--
name: 'Tool Description: ResolveMcpConnectors'
description: >-
  Describes the ResolveMcpConnectors tool for resolving full connector payloads
  from directoryUuid values returned by SearchMcpRegistry.
ccVersion: 2.1.310
-->
Resolve full connector payloads for a set of directoryUuid values returned by SearchMcpRegistry. Do NOT call this unless you already have directoryUuid values from a SearchMcpRegistry result, or installed connectors' server_id values listed in your system prompt — do not guess UUIDs or pass connector names.

Returns name, description, url, iconUrl, sample tool names, and whether the connector is already installed for the user's claude.ai org. installState reflects org-level auth, not whether tools are loaded this session — check ListConnectors' enabledInChat before claiming a connector is usable here. For a result with installState: "needs_reconnect" whose tools are not in your tool list, ask the user to sign in to the connector again, from the connector card the app shows for this call or from their connector settings if they see no card. If a result looks relevant and is not installed, tell the user they could connect it via claude.ai; this tool does not itself connect anything.
