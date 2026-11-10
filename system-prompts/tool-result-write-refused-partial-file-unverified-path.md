<!--
name: 'Tool Result: Write refused partial file unverified path'
description: >-
  Refuses to write to a path that could not be verified as distinct from a
  partially read file, directing use of the edit tool.
ccVersion: 2.1.321
variables:
  - EDIT_TOOL_NAME
-->
Nothing was written. Only the start of a file was given in this session, and it could not be checked that this path is a different file. To change this file, use ${EDIT_TOOL_NAME}.
