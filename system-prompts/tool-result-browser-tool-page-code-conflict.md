<!--
name: 'Tool Result: Browser tool page code conflict refused'
description: >-
  Refuses a browser action because code has already run in a page in this
  session, risking capture of private data.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was refused: this session has already run code in a page, and the two can't be combined in one session. Don't ask the person to send anything private in this chat or type it in this session's tabs instead: code already run in those tabs could capture it. If they want to do it themselves, ask them to open a new tab on their own. To use ${TOOL_NAME}, ask the person to start a new session.
