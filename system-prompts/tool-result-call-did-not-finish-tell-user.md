<!--
name: 'Tool Result: Call did not finish'
description: >-
  Tool result suffix informing the model that a call did not finish and
  instructing it to tell the user before calling it again.
ccVersion: 2.1.329
variables:
  - CALL_NAME
  - ALREADY_SENT_CLAUSE
-->
. ${CALL_NAME} did not finish.${ALREADY_SENT_CLAUSE} Tell the user before 
