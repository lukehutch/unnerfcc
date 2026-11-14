<!--
name: 'Tool Result: Invalid JSON tool input'
description: >-
  Reports that a tool call's input could not be parsed as JSON, lists common
  causes, and instructs retrying with valid JSON.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - PARSE_ERROR_DETAIL
-->
${TOOL_NAME} was called with input that could not be parsed as JSON.
${PARSE_ERROR_DETAIL}Common causes: unescaped backslashes in file paths (use / or \\), unescaped control characters, or truncated output. Retry with valid JSON.
