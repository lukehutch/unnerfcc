<!--
name: 'Tool Result: Artifact DB str_replace Invalid Parameter'
description: >-
  Explains that str_replace edits a single field in place and does not accept
  full field payloads.
ccVersion: 2.1.270
-->
` is not accepted with db_op "str_replace" — it edits one field in place with `field`, `old_str` and `new_str`; use update to send fields
