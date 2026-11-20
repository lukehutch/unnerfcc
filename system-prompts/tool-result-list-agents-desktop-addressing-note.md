<!--
name: 'Tool Result: ListAgents Claude Desktop session addressing'
description: >-
  Instructs passing both name and bracketed ID when messaging a Claude Desktop
  session, noting that a message wakes a stopped session.
ccVersion: 2.1.329
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
 To message a Claude Desktop session, give ${SEND_MESSAGE_TOOL_NAME} its name and brackets as printed: the name alone can belong to another session. A message wakes a stopped session.
