<!--
name: 'Tool Result: Claude in Chrome not connected with install link'
description: >-
  Informs the model that Chrome could not be reached with an install link for
  the extension and troubleshooting steps.
ccVersion: 2.1.272
variables:
  - EXTENSION_INSTALL_URL
-->
Browser extension is not connected. Chrome on the user's computer could not be reached from this session: that computer may be closed or asleep, Chrome may not be running there, the Claude extension may not be installed there (${EXTENSION_INSTALL_URL}), or this session may not be able to connect to Chrome. Ask the user to make sure that computer is awake and Chrome is open there with the Claude extension, then retry. If it still fails, ask the user to check that the extension is signed in to the same claude.ai account they use here.
