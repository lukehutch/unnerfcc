<!--
name: 'Tool Result: File modified on host, read again'
description: >-
  Warns that a file on the specified host was modified since read, requiring
  rereading before attempting a write.
ccVersion: 2.1.270
variables:
  - HOST
-->
File has been modified on ${HOST} since this session read it. Read it again there (Read with "_host": "${HOST}") before attempting to write it.
