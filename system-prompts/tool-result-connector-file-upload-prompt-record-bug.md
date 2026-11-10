<!--
name: 'Tool Result: Connector file upload internal record bug'
description: >-
  Informs that a file upload failed due to a bug in Claude Code failing to track
  the approved files.
ccVersion: 2.1.321
variables:
  - INSTRUCTION_CLAUSE
-->
The files could not be sent because of a bug in Claude Code (it kept no record of the files the approval prompt named); the user cannot fix this. ${INSTRUCTION_CLAUSE}
