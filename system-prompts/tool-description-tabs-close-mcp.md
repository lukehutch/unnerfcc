<!--
name: 'Tool Description: Tabs Close MCP'
description: >-
  Description for the tabs_close_mcp browser tool that closes a tab in the MCP
  tab group by ID.
ccVersion: 2.1.202
-->
Close a tab in the MCP tab group by its ID. Use to clean up tabs you're done with. Only tabs in this session's group are closable; call tabs_context_mcp first to get valid IDs. If you close the group's last tab, Chrome auto-removes the group — the next tabs_context_mcp with createIfEmpty starts fresh.
