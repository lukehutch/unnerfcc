<!--
name: 'Tool Result: Desktop browser tools connection status guidance'
description: >-
  Explains how to detect and use desktop browser tools or fall back to Chrome
  tools.
ccVersion: 2.1.310
variables:
  - LOADING_INSTRUCTION
  - STATUS_NOTE
-->
The Claude desktop app's built-in browser needs no enabling: its tools are the ones whose names contain Claude_Browser. ${LOADING_INSTRUCTION}. ${STATUS_NOTE} If you have no browser tool of any kind, tell the user that the browser in their Claude desktop app is not available in this chat right now and continue with what you can do here.
