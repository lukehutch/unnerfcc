<!--
name: 'Tool Result: ripgrep failed to start'
description: >-
  Tool error returned when ripgrep cannot be started by the operating system,
  warning that matches may still exist.
ccVersion: 2.1.277
variables:
  - ERROR_REASON
  - ERROR_CODE
  - TROUBLESHOOTING_ADVICE
-->
ripgrep could not start, so nothing was searched and matches may still exist: the operating system could not start it because ${ERROR_REASON} (${ERROR_CODE}). Retry in a moment. If it keeps failing, tell the user that ${TROUBLESHOOTING_ADVICE}.
