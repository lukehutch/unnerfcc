<!--
name: 'Tool Result: Attach non-regular file denied'
description: >-
  Refuses attaching directories or non-regular files and instructs attaching
  files individually.
ccVersion: 2.1.293
variables:
  - FILE_PATH
  - USER_ACTION_HINT
-->
Cannot attach "${FILE_PATH}": it is not a regular file. Attach files one at a time, not a folder. ${USER_ACTION_HINT}
