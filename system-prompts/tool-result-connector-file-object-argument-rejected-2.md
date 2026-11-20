<!--
name: 'Tool Result: Connector file object argument rejected'
description: >-
  Refuses a connector call whose argument holds a connector file metadata object
  and appends rejection guidance.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
  - ARGUMENT_NAME
  - REJECTION_DETAILS
-->
No file was sent and ${TOOL_NAME} was not called: the argument ${ARGUMENT_NAME} holds an object with an id, a mimeType and a size, which is how a file is written for a connector. ${REJECTION_DETAILS}
