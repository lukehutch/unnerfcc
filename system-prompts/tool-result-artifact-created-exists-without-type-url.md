<!--
name: 'Tool Result: Artifact exists, publish without type_url'
description: >-
  Instruction noting the Artifact exists and further publishes must omit
  type_url.
ccVersion: 2.1.277
variables:
  - PUBLISH_ACTION_HINT
  - EXTRA_SECTIONS
-->
. The Artifact exists — ${PUBLISH_ACTION_HINT}, WITHOUT `type_url` (passing it again would create another Artifact).${EXTRA_SECTIONS}
