<!--
name: 'Tool Result: ListAgents main session addressing'
description: >-
  Reports the main session's external name and explains how other sessions and
  internal sessions address it.
ccVersion: 2.1.270
variables:
  - EXTERNAL_SESSION_NAME
  - INTERNAL_ADDRESS
  - EXTRA_NOTE
-->
This process's main session is ${EXTERNAL_SESSION_NAME} — the name OTHER sessions use to message it (it is not listed below; from inside this process, address the main conversation as "${INTERNAL_ADDRESS}").${EXTRA_NOTE}
