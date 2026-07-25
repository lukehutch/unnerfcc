<!--
name: 'System Reminder: Large file — read in chunks until 100% read'
description: >-
  Large-file guidance telling the model to read the file in fixed-size line
  chunks via offset/limit until it has read 100% of it.
ccVersion: 2.1.219
variables:
  - FILE_PATH
  - CHUNK_LINE_COUNT
-->
read ${FILE_PATH} in chunks of ~${CHUNK_LINE_COUNT} lines using offset/limit until you have read 100% of it.
