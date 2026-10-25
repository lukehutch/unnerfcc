<!--
name: 'Tool Result: User computer path refused suffix'
description: >-
  Provides guidance on transferring files to and from the user's computer when a
  local path is refused.
ccVersion: 2.1.310
variables:
  - COPY_TO_TOOL
  - COPY_FROM_TOOL
-->
, from where ${COPY_TO_TOOL} copies it over; to change a file of theirs, first copy it here with ${COPY_FROM_TOOL}. With none of these tools, work here and tell the user that nothing was saved on their computer.
