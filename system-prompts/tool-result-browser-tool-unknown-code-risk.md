<!--
name: 'Tool Result: Browser tool unknown tool page code risk'
description: >-
  Refuses an unrecognized browser tool that might run code in a page while
  allowing other browser tools.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was refused: it isn't a browser tool this app knows, and it might run code in a page. Other browser tools still work.
