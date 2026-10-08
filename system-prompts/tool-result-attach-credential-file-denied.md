<!--
name: 'Tool Result: Attach credential file denied'
description: >-
  Refuses attaching a file kept under credential folders or names without
  explicit user confirmation.
ccVersion: 2.1.293
variables:
  - FILE_PATH
  - REASON_NOTE
  - USER_ACTION_HINT
-->
Cannot attach "${FILE_PATH}": its name or folder is one that credentials are kept under (such as .env, a .pem or .key file, or .ssh), so it is not sent on Claude's word alone. ${REASON_NOTE} ${USER_ACTION_HINT}
