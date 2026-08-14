<!--
name: 'Tool Result: Live artifact version now counts as viewed'
description: >-
  Returns the artifact's live published version after a refused publish and
  requires merging edits onto it so no published content is lost before
  publishing again.
ccVersion: 2.1.231
variables:
  - PUBLISH_REFUSED_NOTICE
-->
${PUBLISH_REFUSED_NOTICE} That version is below and now counts as viewed: merge your edits onto it so no published content is lost unintentionally, then publish again.
