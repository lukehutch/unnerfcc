<!--
name: 'Tool Parameter: Chrome navigate tab_id'
description: >-
  tab_id parameter of the Chrome navigate tool — which tab to act on, when it is
  inferred, and when it is required.
ccVersion: 2.1.219
-->
Tab ID to navigate. Must be a tab in the current group. If omitted for URL navigation when calling navigate standalone, tabs_context_mcp{createIfEmpty:true} is called for you. Required for url:"back"/"forward" and for navigate (and other tools that act on a page) inside browser_batch.
