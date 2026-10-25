<!--
name: 'Tool Result: Live artifact version now counts as viewed'
description: >-
  Returns the artifact's live published version after a refused publish and
  requires merging edits onto it so no published content is lost before
  publishing again.
ccVersion: 2.1.310
variables:
  - REFUSAL_REASON
  - MERGE_INSTRUCTION
-->
${REFUSAL_REASON} That version now counts as viewed; its content and how to merge onto it follow.
${MERGE_INSTRUCTION} so no published content is lost
