<!--
name: 'Tool Result: Connector call stopped while running'
description: >-
  Model-facing correction clarifying that a connector call was stopped
  mid-execution rather than refused beforehand, so files may already have been
  sent.
ccVersion: 2.1.329
variables:
  - PREFIX
-->
${PREFIX} Correction to the text above: this call was stopped while running, not refused before it ran. It may have run in part or in full, and files it sends may have reached the connector. Tell the user before sending any of them again. The instruction to stop and wait still stands.
