<!--
name: 'Tool Result: Session renamed former name notice'
description: >-
  Informs the model that a target session was renamed and provides its current
  name.
ccVersion: 2.1.270
variables:
  - NEW_SESSION_NAME
  - FORMER_SESSION_NAME
-->

A session on this machine now named '${NEW_SESSION_NAME}' reports '${FORMER_SESSION_NAME}' as one of its former names — if that is the session you meant, it goes by '${NEW_SESSION_NAME}' now (a rename, not a stop).
