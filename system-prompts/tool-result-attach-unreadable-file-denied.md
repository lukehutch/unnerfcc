<!--
name: 'Tool Result: Attach unreadable file denied'
description: Refuses attaching a file that the current session is not allowed to read.
ccVersion: 2.1.293
variables:
  - FILE_PATH
  - DETAILS
  - USER_ACTION_HINT
-->
Cannot attach "${FILE_PATH}": only files this session is allowed to read can be attached. ${DETAILS} ${USER_ACTION_HINT}
