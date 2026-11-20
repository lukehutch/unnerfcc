<!--
name: 'Tool Result: project_write content contains only SEARCH/REPLACE blocks'
description: >-
  Refuses a content write that consists only of SEARCH/REPLACE blocks rather
  than the full document text.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
-->
${REFUSAL_PREFIX} The text is only SEARCH/REPLACE blocks, and would have replaced the whole doc. 
