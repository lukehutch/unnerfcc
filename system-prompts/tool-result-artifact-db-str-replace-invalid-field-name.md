<!--
name: 'Tool Result: Artifact DB str_replace Invalid Field Name'
description: Explains constraints on document field names for the str_replace operation.
ccVersion: 2.1.270
variables:
  - MAX_FIELD_BYTES
-->
`field` must name one top-level key of the document (1-${MAX_FIELD_BYTES} bytes; no dots, slashes, brackets, quotes, control or invisible formatting characters; not a reserved __name__ key) — str_replace edits a top-level string field, not a path into nested data; use update for nested fields.
