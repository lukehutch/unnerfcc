<!--
name: 'Tool Result: Browser call connection lost'
description: >-
  Informs the model that a browser tool connection was lost before a result
  returned and advises checking page state before retrying.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
The "${TOOL_NAME}" tool call was sent, but the connection was lost before its result came back. The action may have happened, may still be in progress or waiting for the user in Chrome, or may not have happened. If the call only reads the page, call it again. Otherwise do not repeat it yet: first check the page's current state (for example with "get_page_text" or a screenshot), and repeat the action only if it clearly did not take effect.
