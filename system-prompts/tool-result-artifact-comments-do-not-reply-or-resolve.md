<!--
name: 'Tool Result: Artifact comments do not reply or resolve clause'
description: >-
  Instructs not calling action reply or resolve on cross-org comments and
  communicating answers directly in session.
ccVersion: 2.1.277
variables:
  - FOLLOW_UP_NOTE
-->
, so do not call action "reply" or "resolve" here — act on a request in the session and tell the user your answer cannot be posted on the thread from here.${FOLLOW_UP_NOTE}
