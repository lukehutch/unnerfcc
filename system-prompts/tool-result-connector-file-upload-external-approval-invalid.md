<!--
name: 'Tool Result: Connector file upload external approval invalid'
description: >-
  Rejects connector file transfer when approved outside Claude Code's terminal
  prompt.
ccVersion: 2.1.321
variables:
  - APPROVAL_LOCATION_CLAUSE
  - INSTRUCTION_CLAUSE
-->
No file was sent: this call was approved outside Claude Code's own permission prompt on this computer (for example by an app's saved "always allow", an IDE extension, another device, or a program that answers prompts). Files go to a connector only after an Allow given ${APPROVAL_LOCATION_CLAUSE}. ${INSTRUCTION_CLAUSE}
