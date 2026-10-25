<!--
name: 'Tool Result: Artifact edits parameter only valid with file_path'
description: >-
  Instructs removing the edits parameter when calling artifact operations other
  than file_path publish.
ccVersion: 2.1.310
variables:
  - ACTION_NAME
-->
`edits` applies only to a publish of `file_path` — remove it from this "${ACTION_NAME}" call.
