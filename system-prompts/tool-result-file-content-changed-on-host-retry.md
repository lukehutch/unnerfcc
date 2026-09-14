<!--
name: 'Tool Result: File content changed on host, reread and retry'
description: >-
  Warns that file content on the specified host has changed since it was read,
  instructing to read it again before retrying.
ccVersion: 2.1.270
variables:
  - HOST
-->
File content on ${HOST} has changed since this session read it. Read it again there (Read with "_host": "${HOST}"), then retry.
