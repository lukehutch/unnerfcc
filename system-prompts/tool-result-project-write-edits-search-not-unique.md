<!--
name: 'Tool Result: project_write edits search text not unique'
description: >-
  Reports that a SEARCH/REPLACE block's search text matched multiple locations
  and instructs adding surrounding context.
ccVersion: 2.1.329
variables:
  - BLOCK_SUBJECT
-->
${BLOCK_SUBJECT} is in the doc more than once. Add the words around it so that it is found once, then send all the blocks again.
