<!--
name: 'Tool Description: Artifact watch wake and background registration'
description: >-
  Explains artifact wake behavior, background watch registration, and criteria
  for confirming active watches.
ccVersion: 2.1.257
variables:
  - STATUS_CHECK_INSTRUCTION
  - SESSION_ELIGIBILITY_NOTE
-->
; nothing streams in between, so on a wake re-read the artifact before editing. Publishing an artifact starts registering its watch in the background, and the result line says whether that began, was skipped, or was already registered. ${STATUS_CHECK_INSTRUCTION} Do not claim you are watching an artifact unless a watch result or a publish result's "already registered" line says so — its "arming" line is not yet a watch.${SESSION_ELIGIBILITY_NOTE}
