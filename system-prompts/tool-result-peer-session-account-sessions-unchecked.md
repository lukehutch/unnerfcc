<!--
name: 'Tool Result: Peer session lookup skipped account sessions'
description: >-
  Tells the model a peer-session lookup could not check the account's Remote
  Control and cloud sessions, so the named session may be one of those and the
  call should be retried.
ccVersion: 2.1.231
variables:
  - TARGET_SESSION_NAME
-->

Your account's other sessions (Remote Control and cloud) could not be checked just now, so they were not searched. If '${TARGET_SESSION_NAME}' is one, retry
