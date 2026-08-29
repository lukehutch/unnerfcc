<!--
name: 'Tool Result: Artifact DB Batch Outcome Unknown'
description: >-
  Warns that a batch write outcome is unknown and advises reading back before
  retrying.
ccVersion: 2.1.251
variables:
  - ERROR_MESSAGE
-->
${ERROR_MESSAGE}; the batch's outcome is unknown — it applies all-or-nothing and may have committed; read back before retrying
