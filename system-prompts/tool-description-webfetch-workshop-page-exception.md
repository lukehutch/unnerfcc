<!--
name: 'Tool Description: WebFetch workshop page exception'
description: >-
  Routes workshop pages to the Artifact tool's read_page_data action with the
  workshop-decisions schema instead of WebFetch, which the workshop skill
  forbids there.
ccVersion: 2.1.251
variables:
  - ARTIFACT_TOOL_NAME
-->
for a workshop page use the ${ARTIFACT_TOOL_NAME} tool's read_page_data action with schema "workshop-decisions" — the workshop skill forbids a content read there; otherwise 
