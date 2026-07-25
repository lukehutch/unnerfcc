<!--
name: 'Tool result: Memory sync disabled (foreign partition)'
description: >-
  Tells the model a conflicting sync-state directory disabled memory sync, how
  sync re-enables itself, and to report the conflict to the user.
ccVersion: 2.1.219
-->
/ — sync re-enables automatically on the next sync cycle once it is out of the way (within the hour at most, sooner on the next write or restart); deleting it instead discards any unsynced files inside it, and writing new files into it first keeps sync disabled — or save this content to a different memory directory. Tell the user the memory directory has a conflict that needs attention.
