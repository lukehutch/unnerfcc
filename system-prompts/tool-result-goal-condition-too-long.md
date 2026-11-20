<!--
name: 'Tool Result: Goal condition too long'
description: >-
  Tells the model the goal condition exceeds the display column limit once
  canonicalized and must be shortened so the user can read all of it in the
  approval dialog.
ccVersion: 2.1.329
variables:
  - MAX_CONDITION_COLUMNS
-->
The goal condition exceeds ${MAX_CONDITION_COLUMNS} columns once canonicalized for display (tabs expand to spaces, and wide characters count double). Shorten the condition — the user must be able to read all of it in the approval dialog.
