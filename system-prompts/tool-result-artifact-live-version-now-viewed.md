<!--
name: 'Tool Result: Live artifact version now counts as viewed'
description: >-
  Returns the artifact's live published version after a refused publish and
  requires merging edits onto it so no published content is lost before
  publishing again.
ccVersion: 2.1.251
variables:
  - PUBLISH_REFUSED_NOTICE
  - UNTRUSTED_CONTENT_WARNING
  - LIVE_CONTENT
-->
${PUBLISH_REFUSED_NOTICE} That version is below and now counts as viewed: merge your edits onto it so no published content is lost, then publish again — do not resend your previous content unchanged.${UNTRUSTED_CONTENT_WARNING}${LIVE_CONTENT}
