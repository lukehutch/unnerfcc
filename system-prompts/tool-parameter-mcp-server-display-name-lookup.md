<!--
name: 'Tool Parameter: MCP server display_name lookup'
description: >-
  Tells the model to list MCP servers via the API and use each entry's
  display_name as the `server` value alongside tool-prefix segments.
ccVersion: 2.1.219
-->
/v1/mcp_servers?limit=1000`; in that case use each entry's `display_name` as the `server` value (exact display names are always accepted alongside tool-prefix segments).
