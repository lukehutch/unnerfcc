<!--
name: 'Tool Result: Ambiguous artifact type titles'
description: >-
  Prompts the model to ask the user to clarify which artifact type is intended
  when multiple match.
ccVersion: 2.1.272
variables:
  - TYPE_TITLE
  - MATCHING_OPTIONS
-->
Several published Artifact types are titled ${TYPE_TITLE} — ask the user which they mean (${MATCHING_OPTIONS}):
