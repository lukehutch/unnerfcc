<!--
name: 'Tool Result: Attach hard-linked file denied'
description: >-
  Refuses attaching a file with multiple hard links to prevent accessing
  unpermitted paths.
ccVersion: 2.1.293
variables:
  - FILE_PATH
  - USER_ACTION_HINT
-->
Cannot attach "${FILE_PATH}": the file has more than one hard link, which can point at a file outside the folders this session may read. Copy the file and attach the copy. ${USER_ACTION_HINT}
