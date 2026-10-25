<!--
name: 'Tool Result: Claude Test confirm run line too long'
description: >-
  Validation error enforcing maximum length and non-empty content on outline
  lines.
ccVersion: 2.1.310
variables:
  - MAX_CHARACTERS
-->
Nothing was asked: each line must be text of at most ${MAX_CHARACTERS} characters, not empty once control and invisible characters are taken out.
