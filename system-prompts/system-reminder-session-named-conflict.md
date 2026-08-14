<!--
name: 'System Reminder: Requested session name was already taken'
description: >-
  Tells the model the name the user asked for is held by another live session on
  this machine, gives the name this session carries instead, and notes the
  requested name may indicate the session's focus or intent.
ccVersion: 2.1.232
variables:
  - REQUESTED_SESSION_NAME
  - ASSIGNED_SESSION_NAME
-->
The user asked to name this session "${REQUESTED_SESSION_NAME}"; another live session on this machine already holds that name, so this session is "${ASSIGNED_SESSION_NAME}". The requested name may indicate the session's focus or intent.
