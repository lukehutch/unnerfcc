<!--
name: 'Tool Description: Starting from a listed Artifact type workflow'
description: >-
  Instructs how to start from a listed artifact type by publishing type_url with
  no files to get instructions.
ccVersion: 2.1.251
variables:
  - INSTRUCTIONS_FIELD
-->
To start from a listed type, first publish with its `type_url` and NO files — the result carries the type's instructions (its ${INSTRUCTIONS_FIELD}) for the data files it expects — then publish those data files to the returned `url`.
