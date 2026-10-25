<!--
name: 'Tool Description: Background output file inspection condition'
description: >-
  Advises reading background output files only when the user asks for progress
  or a specific readiness indicator is needed.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
-->
${READ_TOOL_NAME} the file only if the user asks for progress, or if you need a line it prints before you can go on, such as a server's ready line or port.
