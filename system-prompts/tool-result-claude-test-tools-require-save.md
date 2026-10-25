<!--
name: 'Tool Result: Claude Test run tools require save'
description: >-
  Informs that test run tools require an initial save, ending the run as
  whole-run BLOCKED.
ccVersion: 2.1.310
variables:
  - TOOL_ONE
  - TOOL_TWO
  - TOOL_THREE
-->

This run cannot be recorded: ${TOOL_ONE}, ${TOOL_TWO} and ${TOOL_THREE} serve a run only after its save. End now, before any page is loaded: your final message is the whole-run BLOCKED report, with this answer under its header, but not this last line.
