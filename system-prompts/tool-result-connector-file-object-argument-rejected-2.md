<!--
name: 'Tool Result: Connector file object argument rejected'
description: >-
  Refuses a connector call whose argument holds a connector file metadata
  object, instructing not to retry with it.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - ARGUMENT_NAME
-->
No file was sent and ${TOOL_NAME} was not called: the argument ${ARGUMENT_NAME} holds an object with an id, a mimeType and a size, which is how a file is written for a connector. Claude Code sends no file through ${ARGUMENT_NAME} and does not pass such an object on. Do not retry with one there. Tell the user if they asked for a file to go this way. A call with no such object in ${ARGUMENT_NAME} is still sent.
