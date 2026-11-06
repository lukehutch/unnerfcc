<!--
name: 'System Reminder: File read token limit call estimate'
description: >-
  Estimates the number of read calls needed based on the 25,000 token limit per
  call.
ccVersion: 2.1.318
variables:
  - ESTIMATED_CALLS
-->
 at most 25,000 tokens a call, about 60 KB of plain text, so the whole file takes about ${ESTIMATED_CALLS} 
