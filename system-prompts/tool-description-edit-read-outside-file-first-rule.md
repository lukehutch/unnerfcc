<!--
name: 'Tool Description: Edit read outside file first rule'
description: >-
  Instructs that files outside the working directory must be read using the Read
  tool before editing.
ccVersion: 2.1.251
variables:
  - READ_TOOL_NAME
-->

- If the file is outside the working directory, you must use your `${READ_TOOL_NAME}` tool to read it before editing. This tool will error if you edit such a file without reading it first.
