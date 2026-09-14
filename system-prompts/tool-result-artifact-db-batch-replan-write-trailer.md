<!--
name: 'Tool Result: Artifact DB batch re-plan write (trailer)'
description: >-
  Instructs re-reading the document, re-planning its write against current
  content, and pinning to the new version.
ccVersion: 2.1.270
variables:
  - FIRST_STALE_PIN_NOTE
-->
: read it back, re-plan its write against what it holds now and pin to that version. ${FIRST_STALE_PIN_NOTE}
