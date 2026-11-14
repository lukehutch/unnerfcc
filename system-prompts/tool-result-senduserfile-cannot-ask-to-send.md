<!--
name: 'Tool Result: Cannot ask user whether to send file'
description: >-
  Informs the model that the session could not prompt the user about sending a
  flagged file and instructs telling the user plainly.
ccVersion: 2.1.325
variables:
  - CALL_PREFIX
  - SECRET_CHECK_FINDING
-->
${CALL_PREFIX}${SECRET_CHECK_FINDING}, and this session could not ask the person whether to send it anyway. Tell the person so, in plain words.
