<!--
name: 'Tool Result: Context log not delivered'
description: >-
  Informs the model that a context log message could not be delivered along with
  the reason.
ccVersion: 2.1.318
variables:
  - CONTEXT_NAME
  - REASON
-->
contexts.${CONTEXT_NAME}.log was not delivered — ${REASON}
