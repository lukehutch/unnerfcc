<!--
name: 'Tool Result: Memory continuation file warning prefix'
description: >-
  Warns that a memory file appears to be a continuation file and explains that
  recall treats files independently.
ccVersion: 2.1.251
variables:
  - CONTINUATION_FILE
  - BASE_FILE
-->
`${CONTINUATION_FILE}` looks like a continuation of `${BASE_FILE}.md`. Recall treats every file independently and shows only its first 
