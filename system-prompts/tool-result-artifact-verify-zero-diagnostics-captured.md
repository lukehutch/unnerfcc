<!--
name: 'Tool Result: Zero diagnostics captured on load'
description: >-
  Reports that a viewer loaded the artifact version and no errors or diagnostics
  were captured.
ccVersion: 2.1.251
variables:
  - ARTIFACT_URL
  - VERSION
-->
A viewer loaded ${ARTIFACT_URL} (version ${VERSION}) and zero diagnostics were captured: no console output, uncaught errors, failed resource loads, or failed capability calls reached the capture. Capture is cooperative and bounded — a good signal, not proof of correctness.
