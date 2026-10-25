<!--
name: 'Tool Result: Request Access Browser Guidance'
description: >-
  Warns about read-only browser grant limitations and directs interactive
  browser tasks to Claude in Chrome.
ccVersion: 2.1.310
variables:
  - CONFIRMATION_INSTRUCTION
-->
You requested access to a browser. It is rare for this to be required: browser applications can only ever be granted in 'read' mode, so you cannot use them to interact with websites — you can only see what is already on screen. Only request browser access if the user specifically wants you to see exactly what they are looking at. For all other browser interaction (navigating, clicking, typing, filling forms), you must use the Claude in Chrome extension MCP instead.${CONFIRMATION_INSTRUCTION}
