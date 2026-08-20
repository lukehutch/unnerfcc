<!--
name: 'Tool Result: Invalid memory path'
description: >-
  Rejects a memory path and states the rules — byte limit, no dot-leading folder
  segments, an allowed file extension, and no control characters or backslashes.
ccVersion: 2.1.231
variables:
  - RESERVED_NAMES_NOTE
-->
 is not a valid memory path: use at most 1024 bytes, folder segments that do not start with "."${RESERVED_NAMES_NOTE}, a filename ending in .md, .txt, .json, or .jsonl, and no control characters or backslashes.
