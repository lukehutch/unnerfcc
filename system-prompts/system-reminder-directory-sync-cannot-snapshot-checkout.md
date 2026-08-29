<!--
name: 'System Reminder: Directory sync cannot snapshot checkout'
description: >-
  Informs the model that changes could not be snapshotted or sent to the user
  machine due to the specified reason.
ccVersion: 2.1.251
variables:
  - REASON
-->
Directory sync: this turn's changes were NOT sent to the user's machine because this checkout cannot be snapshotted: ${REASON}. Nothing of yours reaches the user until that is resolved (finish or abort the operation, resolve and commit); do not tell the user their files have arrived — say they are held here until then.
