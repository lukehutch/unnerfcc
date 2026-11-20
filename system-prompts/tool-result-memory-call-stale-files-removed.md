<!--
name: 'Tool Result: Memory call blocked due to stale removed files'
description: >-
  Model-facing tool result refusing a memory call because the displayed memory
  is out of date and listing files removed from conversation memory.
ccVersion: 2.1.329
variables:
  - REMOVED_MEMORY_FILES
-->
This memory call was not run, because the memory you were shown is out of date. These files are no longer in this conversation's memory: ${REMOVED_MEMORY_FILES}. The current memory follows this result, with a note on those files. A save that is still right can be made again.
