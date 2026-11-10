<!--
name: 'Tool Result: Browser batch unknown tool page code risk'
description: >-
  Refuses browser_batch actions because an unrecognized tool might execute code
  in a page.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
This browser_batch was refused and none of its actions ran, because ${TOOL_NAME} isn't a browser tool this app knows, and it might run code in a page. Send the other actions again without ${TOOL_NAME}.
