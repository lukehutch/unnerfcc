<!--
name: 'Tool Result: Connector downloads remote send refused'
description: >-
  Refuses sending connector download files to remote sessions, requiring a local
  session instead.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
The ${TOOL_NAME} tool doesn't send files downloaded from claude.ai connectors, or any file in a connector-downloads folder, to a session on another machine. To read this file, use a Claude Code session on the machine where the file is.
