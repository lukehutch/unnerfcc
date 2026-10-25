<!--
name: 'Tool Result: Attach file bidirectional characters denied'
description: >-
  Rejects attaching a file whose name contains bidirectional text control
  characters.
ccVersion: 2.1.310
variables:
  - FILE_NAME
  - ADDITIONAL_GUIDANCE
-->
Cannot attach "${FILE_NAME}": its name contains a character that changes text direction. Rename it, or copy it under another name. ${ADDITIONAL_GUIDANCE}
