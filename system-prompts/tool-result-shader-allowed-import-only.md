<!--
name: 'Tool Result: Shader single allowed import module'
description: >-
  Model-facing shader validation error stating a shader may import only from the
  allowed module and the rest must be written in the file.
ccVersion: 2.1.329
variables:
  - ALLOWED_IMPORT_MODULE
-->
a shader imports from "${ALLOWED_IMPORT_MODULE}" alone: write the rest in this file
