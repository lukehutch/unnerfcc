<!--
name: 'Tool Result: Artifact File Unchanged Since Refusal'
description: >-
  Refuses an artifact publish because no edits were applied and the file is
  unchanged since a prior refusal.
ccVersion: 2.1.310
variables:
  - REFUSAL_PREFIX
  - REFUSAL_CONTEXT
  - RECOVERY_INSTRUCTIONS
-->
${REFUSAL_PREFIX} no edits were applied and your file at file_path is unchanged since it was refused ${REFUSAL_CONTEXT}${RECOVERY_INSTRUCTIONS}
