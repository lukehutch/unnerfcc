<!--
name: 'Tool Result: Remote machine unreadable tool format'
description: Reports that the machine announced a tool in a form this session cannot read.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - TOOL_NAME
-->
${MACHINE_NAME} announced ${TOOL_NAME} in a form this session cannot read (a version or naming mismatch between the two Claude Code builds — update whichever is older); nothing ran.
