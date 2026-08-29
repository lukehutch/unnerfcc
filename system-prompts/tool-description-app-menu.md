<!--
name: 'Tool Description: app_menu'
description: >-
  Describes the app_menu tool for interacting with menu bar items in background
  apps.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
Reach the menu bar of one granted application without bringing it to the front. Two modes:
  • path: ["File", "Export as PDF…"] — walk the menu bar by title and press the leaf item. Match is case-insensitive and ignores trailing …/...
  • list: "File" — return the item titles under that menu; list: null — return the top-level menu titles.
Provide exactly one of path or list. Use this instead of app_key for ⌘-shortcuts (e.g. app_menu {path: ["Edit", "Undo"]} instead of "cmd+z").${BACKGROUND_NOTE}
