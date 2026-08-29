<!--
name: 'Tool Result: Request access browser warning'
description: >-
  Warns against requesting browser access when Claude in Chrome MCP should be
  used instead.
ccVersion: 2.1.251
variables:
  - RETRY_CONFIRMATION_NOTE
-->
You requested access to a browser. It is rare for this to be required: browser applications can only ever be granted in 'read' mode, so you cannot use them to interact with websites — you can only see what is already on screen. Only request browser access if the user specifically wants you to see exactly what they are looking at. For all other browser interaction (navigating, clicking, typing, filling forms), you must use the Claude in Chrome extension MCP instead.${RETRY_CONFIRMATION_NOTE}
