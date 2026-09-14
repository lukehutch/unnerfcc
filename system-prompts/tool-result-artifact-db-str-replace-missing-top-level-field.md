<!--
name: 'Tool Result: Artifact DB str_replace missing top-level field'
description: >-
  Reports that the target field does not exist at top level and instructs
  reading the document or using update.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - FIELD_NAME
  - VERSION_NOTE
-->
${ERROR_PREFIX}: the document has no top-level ${FIELD_NAME}; nothing was written.${VERSION_NOTE} str_replace edits an existing top-level string field — read the document to see its fields, or use update to add one
