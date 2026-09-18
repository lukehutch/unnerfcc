<!--
name: 'Tool Result: Memory store directory unreadable'
description: >-
  Reports that a directory in the memory store's local folder is unreadable so
  sync cannot persist files until its permissions are fixed.
ccVersion: 2.1.277
-->
Part of this memory store's local folder could not be read (for example, permission denied, or a folder removed while sync was reading it), so sync cannot verify or persist local files. Check the folder and its permissions; sync then resumes automatically.
