<!--
name: 'Tool Parameter: Goal completion condition'
description: >-
  Describes the completion condition to propose — written so a separate
  evaluator can verify it from the conversation, and short enough for the user
  to read in the approval dialog.
ccVersion: 2.1.231
variables:
  - MAX_CONDITION_CHARS
-->
The completion condition to propose, written so a separate evaluator can verify it from the conversation (e.g. "all tests in test/auth pass (bun test exits 0)"). At most ${MAX_CONDITION_CHARS} characters — the user must be able to read the whole condition in the approval dialog.
