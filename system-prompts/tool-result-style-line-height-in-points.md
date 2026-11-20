<!--
name: 'Tool Result: Style lineHeight must be points'
description: >-
  Model-facing validation error clarifying that lineHeight is specified in
  points rather than as a font-size multiplier.
ccVersion: 2.1.329
variables:
  - FIELD_PATH
-->
${FIELD_PATH}.lineHeight is points, not a multiple of the font size: 24, not 1.5
