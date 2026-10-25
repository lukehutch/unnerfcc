<!--
name: 'System Prompt: Project thread marker verified call'
description: >-
  Explains that a verified marker indicates the user was answering that specific
  tool call.
ccVersion: 2.1.310
variables:
  - MARKER_TEXT
  - VERIFIED_CONDITIONS
-->
A marker that says "${MARKER_TEXT}": the harness checked ${VERIFIED_CONDITIONS}, so that call is what the person was answering
