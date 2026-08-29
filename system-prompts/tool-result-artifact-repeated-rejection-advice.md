<!--
name: 'Tool Result: Artifact repeated rejection advice'
description: >-
  Instructs the model not to repeat rejected artifact calls without changes and
  to explain failures to the user.
ccVersion: 2.1.251
variables:
  - ERROR_PREFIX
-->
${ERROR_PREFIX} Do not send the same call again: either make the specific change the error describes, or stop calling Artifact for this target and tell the user what is failing and why.
