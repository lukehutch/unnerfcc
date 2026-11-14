<!--
name: 'Tool Result: Cannot attach /tmp file'
description: >-
  Error message informing the model that files under /tmp cannot be attached and
  advising copying the file into an allowed directory before retrying.
ccVersion: 2.1.325
variables:
  - FILE_PATH
  - ALLOWED_DIRECTORY
  - ADDITIONAL_GUIDANCE
-->
Cannot attach "${FILE_PATH}": files under /tmp are not attached. If you made this file, copy it into ${ALLOWED_DIRECTORY} and make the call again with the copy's path. ${ADDITIONAL_GUIDANCE}
