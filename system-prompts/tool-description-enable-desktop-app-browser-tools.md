<!--
name: 'Tool Description: Enable Claude desktop app browser tools'
description: >-
  Model-facing guidance on calling the desktop browser setup tool once when
  working in the Claude desktop app's browser rather than Chrome.
ccVersion: 2.1.325
variables:
  - CHROME_SETUP_TOOL_NAME
-->
When the user asks you to work in the Claude desktop app's own browser or on a website needing their sign-in, and you have no tools for that browser yet, use it once; for their Chrome, use ${CHROME_SETUP_TOOL_NAME}.
