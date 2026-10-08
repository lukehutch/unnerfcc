<!--
name: 'Tool Result: Project write retry failure fallback'
description: >-
  Fallback instructions when project_write retries fail, advising telling the
  user.
ccVersion: 2.1.293
variables:
  - RETRY_HINT
  - READ_CHECK
-->
 ${RETRY_HINT} ${READ_CHECK} If that fails too, tell the user that the new content may not have been saved, and offer it to them another way.
