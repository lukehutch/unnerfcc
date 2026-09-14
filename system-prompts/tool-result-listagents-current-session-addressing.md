<!--
name: 'Tool Result: ListAgents current session addressing'
description: >-
  Reports the current session's external address and notes that messaging it
  messages oneself.
ccVersion: 2.1.270
variables:
  - SESSION_NAME
  - EXTRA_NOTE
-->
This session is ${SESSION_NAME} — the name other sessions use to message it (it is not listed below; a message to it would be a message to yourself).${EXTRA_NOTE}
