<!--
name: 'Tool Result: Verify recorded result in unrecognized state'
description: >-
  Tells the model that a recorded verify result is in an unrecognized state and
  to re-run verify.
ccVersion: 2.1.251
variables:
  - ARTIFACT_URL
  - VERSION
-->
Recorded verify result for ${ARTIFACT_URL} (version ${VERSION}) in an unrecognized state — re-run action: "verify" for a current read. This is NOT evidence about the render either way.
