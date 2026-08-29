<!--
name: 'Tool Result: Artifact unrecoverable rejection advice'
description: >-
  Instructs the model to stop attempting artifact calls and explain the refusal
  to the user.
ccVersion: 2.1.251
variables:
  - ERROR_PREFIX
-->
${ERROR_PREFIX} Stop calling Artifact for this target and tell the user the artifact could not be published and why — do not try to work around this refusal.
