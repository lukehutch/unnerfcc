<!--
name: 'Tool Result: Browser batch action refused session restart required'
description: >-
  Refuses a browser_batch containing an action that requires a new session to
  run code in a page.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
  - REASON
-->
This browser_batch was refused and none of its actions ran, because it includes ${TOOL_NAME}. ${REASON} Send the other actions again without ${TOOL_NAME}. To run code in a page, ask the person to start a new session.
