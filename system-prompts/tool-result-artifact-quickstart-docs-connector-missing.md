<!--
name: 'Tool Result: Quickstart Claude Docs connector missing'
description: >-
  Informs the model that no Claude Docs connector is attached to fill a Docs
  Artifact type and instructs creating the document as a page instead.
ccVersion: 2.1.277
variables:
  - INTENT_ARG
  - NEXT_STEP
-->
No first-party Claude Docs connector (for reading and writing documents) is attached in this session, and a Docs Artifact type can be filled only through it, so no Artifact types were listed. Make the document as a page instead: call quickstart again with ${INTENT_ARG}. ${NEXT_STEP}
