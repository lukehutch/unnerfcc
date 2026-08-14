<!--
name: 'System Reminder: Session renamed because the name was taken'
description: >-
  Tells the model this session was renamed because another live session on this
  machine holds the original name, and to address this one by the new name from
  now on.
ccVersion: 2.1.232
variables:
  - PREVIOUS_SESSION_NAME
  - NEW_SESSION_NAME
  - TAKEN_SESSION_NAME
-->
This session was renamed from "${PREVIOUS_SESSION_NAME}" to "${NEW_SESSION_NAME}" ("${TAKEN_SESSION_NAME}" is held by another live session on this machine). Address this one as "${NEW_SESSION_NAME}" from now on.
