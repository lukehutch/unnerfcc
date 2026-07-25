<!--
name: 'Tool Result: View the complete file'
description: >-
  Tail of a truncated file result telling the model which tool to use to view
  the complete file and where it lives.
ccVersion: 2.1.219
variables:
  - READ_TOOL_NAME
  - FILE_PATH
-->
). Use the ${READ_TOOL_NAME} tool to view the complete file at: ${FILE_PATH}
