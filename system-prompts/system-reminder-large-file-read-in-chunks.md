<!--
name: 'System Reminder: Large file — read in line chunks'
description: >-
  Large-file guidance telling the model to read the file in fixed-size line
  chunks with offset/limit until it has read all of it.
ccVersion: 2.1.219
variables:
  - FILE_PATH
  - CHUNK_LINE_COUNT
-->
Read ${FILE_PATH} in chunks of ~${CHUNK_LINE_COUNT} lines using offset/limit until you have read all 
