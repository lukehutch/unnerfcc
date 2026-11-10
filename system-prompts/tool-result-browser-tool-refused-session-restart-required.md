<!--
name: 'Tool Result: Browser tool refused session restart required'
description: >-
  Refuses a browser tool that cannot run code in the current session and directs
  starting a new session.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
  - REASON
-->
${TOOL_NAME} was refused. ${REASON} Other browser tools still work. To run code in a page, ask the person to start a new session.
