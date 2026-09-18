<!--
name: 'Tool Result: Quickstart core type instructions'
description: >-
  Instructs publishing with the core type's type_url or routing the document to
  the attached connector.
ccVersion: 2.1.277
variables:
  - PUBLISH_PARAMS
  - CONNECTOR_NOTE
  - FORMAT_SKILL_NOTE
  - NEXT_STEP
-->
 marked [core], start from it: publish with its `type_url`, ${PUBLISH_PARAMS}; if it shows none, the document goes to the connector, and to its skill when one appears in your skill list. ${CONNECTOR_NOTE}${FORMAT_SKILL_NOTE} ${NEXT_STEP}
