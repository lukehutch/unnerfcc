<!--
name: 'Tool Result: Attachment reference boolean parameter invalid'
description: >-
  Rejects non-boolean values for email boolean flags when attaching files by
  reference.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 isn't true or false, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with it as true or false, or without it.
