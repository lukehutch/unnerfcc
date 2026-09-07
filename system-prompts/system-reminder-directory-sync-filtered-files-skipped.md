<!--
name: 'System Reminder: Directory sync filtered files skipped'
description: >-
  Warns that files under content-filter or encoding attributes are skipped
  during directory synchronization.
ccVersion: 2.1.263
variables:
  - FILE_LIST
-->
Directory sync: these files are under a content-filter or re-encoding attribute here (git-lfs, git-crypt, working-tree-encoding or similar), so sync never carries their contents in either direction — this checkout's version of them is NOT sent to the user's machine, which keeps its own: ${FILE_LIST}
