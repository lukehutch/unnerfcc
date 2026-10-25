<!--
name: 'Tool Result: Remote control message not sent do not retry'
description: >-
  Tells the user that a remote control message was not sent and instructs the
  model not to look for another tool to send it with.
ccVersion: 2.1.310
variables:
  - FAILURE_REASON
-->
${FAILURE_REASON}. Tell your user it was not sent; do not look for another tool to send it with
