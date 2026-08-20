<!--
name: 'Tool Result: Unexpected routine page shape'
description: >-
  Tells the model a scheduled-routine API page did not parse into the expected
  shape and that the raw start of the body follows.
ccVersion: 2.1.231
variables:
  - ROUTINE_CONTENT_UNTRUSTED_NOTICE
  - ROUTINE_PAGE_KIND
-->
${ROUTINE_CONTENT_UNTRUSTED_NOTICE}
(unexpected ${ROUTINE_PAGE_KIND} page shape; the start of the body follows)
