<!--
name: 'Tool Result: Write refused partial file known'
description: >-
  Refuses to overwrite a file whose full content was not provided in the session
  and directs using the designated edit tool instead.
ccVersion: 2.1.321
variables:
  - EDIT_TOOL_NAME
-->
Only the start of this file was given in this session, so a Write could lose the rest. Nothing was written. To change it, use ${EDIT_TOOL_NAME}. If ${EDIT_TOOL_NAME} says that the path is a link, use it on the link's target.
