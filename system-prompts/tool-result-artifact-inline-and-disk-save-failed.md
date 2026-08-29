<!--
name: 'Tool Result: Artifact Inline and Disk Save Failed'
description: >-
  Informs the model that inline display and disk saving failed, directing a
  re-read and warning against publishing truncated copies.
ccVersion: 2.1.251
variables:
  - READ_ACTION_SYNTAX
-->
Its source could not be shown inline and saving it to disk failed here. Re-read it (${READ_ACTION_SYNTAX}) — it arrives inline if it fits; if it comes back TRUNCATED, tell the user, and do not republish from a truncated copy.
