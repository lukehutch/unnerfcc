<!--
name: 'System Reminder: Large file — slice by character span'
description: >-
  Guidance for files whose lines are too long for offset/limit, telling the
  model to slice the file in character spans via python until fully read.
ccVersion: 2.1.219
variables:
  - FILE_PATH
  - SPAN_CHAR_COUNT
-->
Slice ${FILE_PATH} in ~${SPAN_CHAR_COUNT}-char spans via python (read()[A:B]) until you have read all 
