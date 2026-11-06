<!--
name: 'Tool Result: ToolSearch REPL-only tools matched'
description: >-
  Informs the model that matching tools can only be invoked from a REPL script
  rather than at top level.
ccVersion: 2.1.318
variables:
  - SEARCH_QUERY
-->
ToolSearch loads only tools that run at the top level. These tools also match "${SEARCH_QUERY}", and only a REPL script can call them: 
