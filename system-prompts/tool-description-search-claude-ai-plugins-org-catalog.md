<!--
name: 'Tool Description: Search claude.ai org plugin catalog'
description: >-
  Model-facing guidance on searching the claude.ai org plugin catalog when the
  user asks about plugins for a task.
ccVersion: 2.1.325
variables:
  - LIST_PLUGINS_TOOL_NAME
-->
When the user names a plugin or asks whether one exists for a task, use it to search their claude.ai org catalog; for the plugins they already have, use ${LIST_PLUGINS_TOOL_NAME}.
