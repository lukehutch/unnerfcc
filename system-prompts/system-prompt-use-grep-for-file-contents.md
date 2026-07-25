<!--
name: 'System Prompt: Use Grep for file contents'
description: >-
  Tool-selection bullet telling the model to use the search tool for regex
  searches over file contents.
ccVersion: 2.1.219
variables:
  - GREP_TOOL_NAME
-->
- Use ${GREP_TOOL_NAME} for searching file contents with regex
