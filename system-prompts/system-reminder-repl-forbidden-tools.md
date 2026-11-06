<!--
name: 'System Reminder: REPL forbidden tools reminder'
description: >-
  Instructs the model not to call the specified tools and explains they are
  refused.
ccVersion: 2.1.318
variables:
  - FIRST_TOOL_NAME
  - SECOND_TOOL_NAME
-->
Do not call ${FIRST_TOOL_NAME} or ${SECOND_TOOL_NAME}. They may still be in your tool list, but every call to them is refused. Disregard their descriptions, including the statement that you have no other tools.
