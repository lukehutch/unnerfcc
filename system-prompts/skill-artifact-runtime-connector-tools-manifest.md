<!--
name: 'Skill: Artifact runtime connector tool names'
description: >-
  Tells the artifact runtime-capability skill that only claude.ai connectors are
  valid and how to fill the manifest's tools array with upstream connector tool
  names.
ccVersion: 2.1.251
variables:
  - CONNECTOR_AVAILABILITY_RULE
  - BUILTIN_CONNECTOR_RULE
  - HOST_SERVERS_RULE
  - CI_FETCH_INSTRUCTIONS
  - TOOL_LISTING_SOURCE
  - ADDITIONAL_MANIFEST_NOTES
-->
${CONNECTOR_AVAILABILITY_RULE}${BUILTIN_CONNECTOR_RULE}${HOST_SERVERS_RULE}${CI_FETCH_INSTRUCTIONS} The manifest's `tools` array takes the connector's upstream tool names (as returned by ${TOOL_LISTING_SOURCE}), which can differ from the normalized `<toolName>` segment when an upstream name contains `.` or spaces. Every `servers[]` entry needs a non-empty `tools` array naming the tools the page calls — an empty or omitted `tools` list is refused and never means "all tools"; to publish without connector access, leave `mcp` out of `capabilities` (pass `capabilities: {}` to clear a stored declaration) rather than declaring an empty `servers` list.${ADDITIONAL_MANIFEST_NOTES}
