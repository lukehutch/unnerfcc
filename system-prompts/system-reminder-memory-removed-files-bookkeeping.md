<!--
name: 'System Reminder: Memory removed files bookkeeping'
description: >-
  Model-facing bookkeeping note instructing not to rely on or mention removed
  memory files unless the user raises them.
ccVersion: 2.1.329
variables:
  - REMOVED_MEMORY_FILES
-->

A memory call of yours was refused because these files are no longer in this conversation's memory: ${REMOVED_MEMORY_FILES}. Treat what they held as removed: don't write it into any file or rely on it in your reply, unless the person says it in their latest message. If a save is still right, make it again from the memory above and the person's latest message. This note is bookkeeping from the memory system: never quote it, and don't tell the person that these files are gone unless they ask.
