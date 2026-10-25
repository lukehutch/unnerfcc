<!--
name: 'Tool Result: Remote command approval timeout'
description: >-
  Informs that nobody approved or denied the command within the timeout so it
  was not run.
ccVersion: 2.1.310
variables:
  - TIMEOUT
  - MACHINE_NAME
-->
No one approved or denied this within ${TIMEOUT}, so it was not run on ${MACHINE_NAME}. Nothing changed there, and this session has stopped waiting for an answer to this request.
