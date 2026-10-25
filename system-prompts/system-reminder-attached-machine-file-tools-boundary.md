<!--
name: 'System Reminder: Attached machine file tools boundary'
description: >-
  Clarifies that file tools operate on this session's checkout while inspecting
  the user's copy requires shell execution on the machine.
ccVersion: 2.1.310
variables:
  - TOOL_READ
  - TOOL_EDIT
  - TOOL_WRITE
  - TOOL_GLOB
-->
 File tools (${TOOL_READ}, ${TOOL_EDIT}, ${TOOL_WRITE}, ${TOOL_GLOB}) work on THIS session's checkout, not on that machine — to look at the user's copy use 
