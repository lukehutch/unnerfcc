<!--
name: 'Tool Result: Target exists but is not a regular file'
description: >-
  Error returned when attempting to write to a special file such as a device,
  FIFO, or socket.
ccVersion: 2.1.277
variables:
  - FILE_PATH
-->
${FILE_PATH} exists but is not a regular file (a device, FIFO or socket). Write only creates or overwrites regular files.
