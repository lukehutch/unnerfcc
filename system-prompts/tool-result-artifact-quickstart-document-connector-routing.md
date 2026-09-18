<!--
name: 'Tool Result: Quickstart document routing to first-party connector'
description: >-
  Directs document deliverables to first-party connectors or format skills
  rather than Artifacts when available.
ccVersion: 2.1.277
variables:
  - CONNECTOR_DESCRIPTION
  - FORMAT_SKILL_NOTE
  - NEXT_STEP
-->
When the host has attached ${CONNECTOR_DESCRIPTION}, the document goes to that connector, and to its skill when one appears in your skill list, not to an Artifact. ${FORMAT_SKILL_NOTE}. ${NEXT_STEP}
