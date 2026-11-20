<!--
name: 'Tool Result: project_write edits contain NUL bytes'
description: >-
  Refuses edits containing NUL bytes and instructs removing them before
  resending.
ccVersion: 2.1.329
variables:
  - REFUSAL_PREFIX
-->
${REFUSAL_PREFIX} The blocks contain NUL bytes, which project docs cannot store. Remove them, then send all the blocks again.
