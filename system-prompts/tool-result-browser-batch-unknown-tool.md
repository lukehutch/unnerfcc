<!--
name: 'Tool Result: Browser batch unknown tool'
description: >-
  Reports that an action in a browser_batch named an unknown tool and was
  refused without running.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
Unknown tool: ${TOOL_NAME}. None of this browser_batch's actions ran; send the others again without it.
