<!--
name: 'Tool Result: Connector downloads reading refused'
description: >-
  Refuses reading files in connector-download folders to prevent connector data
  from entering web-enabled conversations.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
Your organization keeps connector data out of conversations that can use web search or web fetch, so the ${TOOL_NAME} tool doesn't read files downloaded from claude.ai connectors, or any file in a connector-downloads folder.
