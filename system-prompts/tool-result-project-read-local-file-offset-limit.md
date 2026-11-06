<!--
name: 'Tool Result: Project read local file offset and limit clause'
description: >-
  Advises reading necessary parts of local_file with offset and limit or
  searching it.
ccVersion: 2.1.318
variables:
  - READ_TOOL_NAME
  - SEARCH_TOOL_NAME
-->
: read the parts you need with ${READ_TOOL_NAME}'s offset and limit, or search it with ${SEARCH_TOOL_NAME}.
