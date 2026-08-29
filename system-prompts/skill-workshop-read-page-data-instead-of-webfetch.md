<!--
name: 'Skill: Workshop read_page_data instead of WebFetch'
description: >-
  Tells the model to read a workshop page through the Artifact tool's
  read_page_data action, since the workshop skill forbids WebFetch and force
  there.
ccVersion: 2.1.251
variables:
  - ARTIFACT_TOOL_NAME
  - FETCH_FALLBACK_INSTRUCTION
-->
for a workshop page use the ${ARTIFACT_TOOL_NAME} tool's read_page_data action with schema "workshop-decisions" — the workshop skill forbids a content read and force there; otherwise ${FETCH_FALLBACK_INSTRUCTION}
