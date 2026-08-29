<!--
name: 'Tool Result: Artifact connector id used instead of name'
description: >-
  Explains that a connector id was passed instead of the connector name and
  instructs how to resolve and set the server name.
ccVersion: 2.1.251
-->
" is a connector id, which no viewer can resolve — set "server" to that connector's name exactly as shown in claude.ai (Settings → Connectors) and pass the same name to callTool/watchTool in the page; if you don't know the name, ask the user, describing the connector by its tools (the user cannot see the id)
