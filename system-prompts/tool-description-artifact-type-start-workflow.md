<!--
name: 'Tool Description: Starting from a listed Artifact type workflow'
description: >-
  Instructs how to start from a listed artifact type by publishing type_url with
  no files to get instructions.
ccVersion: 2.1.257
variables:
  - INSTRUCTIONS_FIELD
-->
To start from a listed type, first publish with its `type_url` and NO files, passing `auto_open: "after_first_write"` when you will fill it next so the user doesn't first see it empty — the result carries the type's instructions (its ${INSTRUCTIONS_FIELD}) for the data files it expects — then publish those data files to the returned `url`.
