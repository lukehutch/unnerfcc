<!--
name: 'System Reminder: Directory sync concurrently written files skipped'
description: >-
  Warns that files being actively written were skipped during directory sync and
  will go out on the next sync point.
ccVersion: 2.1.263
variables:
  - FILE_LIST
  - EXTRA_NOTE
-->
Directory sync: these files were being written while this turn's files were read, so this turn's version of them was NOT sent to the user's machine (it keeps what it last had there): ${FILE_LIST}${EXTRA_NOTE}. They go out at the next sync point that finds them at rest; if a process of yours keeps writing them, say so rather than report them delivered.
