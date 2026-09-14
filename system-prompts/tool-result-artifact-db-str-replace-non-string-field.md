<!--
name: 'Tool Result: Artifact DB str_replace non-string field'
description: >-
  Reports that the target field is not a string and advises using update for
  structured fields.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - FIELD_NAME
  - VERSION_NOTE
-->
${ERROR_PREFIX}: ${FIELD_NAME} is not a string (str_replace edits top-level string fields only); nothing was written — use update for structured fields.${VERSION_NOTE}
