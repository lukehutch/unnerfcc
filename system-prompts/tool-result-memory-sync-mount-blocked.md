<!--
name: 'Tool Result: Memory sync mount blocked by directory'
description: >-
  Tells the model the memory store cannot mount until the conflicting directory
  is empty or gone, and to report the conflict to the user.
ccVersion: 2.1.219
-->
/ — the store mounts automatically on the next sync cycle once the directory is empty or gone (within the hour at most, sooner on the next write or restart); deleting its files instead discards them, and writing new files into it first keeps sync disabled — or save this content to a different memory directory. Tell the user the memory directory has a conflict that needs attention.
