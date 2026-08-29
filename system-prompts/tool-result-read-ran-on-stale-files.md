<!--
name: 'Tool Result: Read ran on stale files'
description: >-
  Notice that a read operation executed against stale files on the remote
  machine.
ccVersion: 2.1.251
variables:
  - REASON
  - MACHINE_NAME
-->
${REASON}; this read ran on ${MACHINE_NAME}'s files as they were, which do not include your latest edits here
