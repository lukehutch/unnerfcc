<!--
name: 'Tool Result: Plugin tool runtime pane teammate unsupported'
description: >-
  Explains that a plugin-registered tool exists only in-process and cannot be
  run by a pane-based teammate.
ccVersion: 2.1.277
variables:
  - SPAWN_TOOL_NAME
-->
' was registered at run time by a plugin and exists only in this process; a pane-based teammate cannot run it. Spawn it with the ${SPAWN_TOOL_NAME} tool instead, or use in-process teammates.
