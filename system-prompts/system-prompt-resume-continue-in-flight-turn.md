<!--
name: 'System Prompt: Resume continues an in-flight turn'
description: >-
  Tells the model to query immediately on resume when the loaded transcript ends
  in a user-role message, since /background sets that mid-turn so the fork
  continues it.
ccVersion: 2.1.219
-->
When resuming, immediately query if the loaded transcript ends in a user-role message (set by /background mid-turn so the fork continues the in-flight turn).
