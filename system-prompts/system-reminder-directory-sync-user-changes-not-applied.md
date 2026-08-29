<!--
name: 'System Reminder: Directory sync user changes not applied'
description: >-
  Informs the model that user changes were not applied due to the specified
  reason and will retry next turn.
ccVersion: 2.1.251
variables:
  - REASON
-->
Directory sync: the user's latest changes were NOT applied to this checkout this turn because ${REASON}; the checkout is unchanged and sync retries at the next turn. If the user refers to edits you cannot see, that is why.
