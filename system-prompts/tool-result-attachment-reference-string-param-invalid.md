<!--
name: 'Tool Result: Attachment reference string parameter invalid'
description: >-
  Rejects non-string values for email text parameters when attaching files by
  reference.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 isn't text, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. Make the call again with it as a string, or without it.
