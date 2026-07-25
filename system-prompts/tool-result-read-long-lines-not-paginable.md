<!--
name: 'Tool Result: File excerpt with unpaginable long lines'
description: >-
  Warns that a file's very long lines prevent line-based pagination and points
  at Grep or offset/limit paging before answering from the excerpt.
ccVersion: 2.1.219
variables:
  - TOKEN_CAP
  - GREP_TOOL_NAME
  - READ_TOOL_NAME
-->
 tokens, cap ${TOKEN_CAP}); this file has very long lines and cannot be paginated by line. Use ${GREP_TOOL_NAME} to find a specific section, or ${READ_TOOL_NAME} with offset/limit to page through it. Do NOT answer from this excerpt alone if the answer may be elsewhere in the file.]
