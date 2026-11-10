<!--
name: 'Tool Result: Connector file upload automated approval invalid'
description: >-
  Rejects connector file transfer when approved by an automated check instead of
  the user.
ccVersion: 2.1.321
variables:
  - REASON_DETAILS
  - INSTRUCTION_CLAUSE
-->
No file was sent: something in place of the user, such as a plugin's permission check, approved this call, and ${REASON_DETAILS}. ${INSTRUCTION_CLAUSE}
