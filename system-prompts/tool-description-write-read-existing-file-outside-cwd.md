<!--
name: >-
  Tool Description: Write must read an existing file outside the working
  directory
description: >-
  Write tool description fragment requiring the Read tool be used first on an
  existing file that lives outside the working directory.
ccVersion: 2.1.251
variables:
  - READ_TOOL_NAME
-->

- If this is an existing file outside the working directory, you MUST use the ${READ_TOOL_NAME} tool first to read the file's contents. This tool will fail if you did not.
