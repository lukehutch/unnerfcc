<!--
name: 'Tool Result: project_write edits malformed blocks'
description: >-
  Validation error specifying the required format and maximum count for
  SEARCH/REPLACE blocks in project_write.
ccVersion: 2.1.329
variables:
  - MAX_BLOCKS
  - FALLBACK_INSTRUCTION
-->
edits must be 1 to ${MAX_BLOCKS} complete SEARCH/REPLACE blocks and nothing else, each with a search text and with each marker once, on its own line. Send them again in that form. If the doc's own text has such a line, or there are more changes, ${FALLBACK_INSTRUCTION}
