<!--
name: 'Tool Result: Style lineHeight below fontSize'
description: >-
  Model-facing validation error warning that lineHeight is smaller than fontSize
  and would cause overlapping lines.
ccVersion: 2.1.329
variables:
  - FIELD_PATH
-->
${FIELD_PATH}.lineHeight is less than its fontSize, so lines would overlap
