<!--
name: 'System Reminder: Directory sync non-git repository guidance'
description: >-
  Instructs the model that the user directory is not a git repo and git exists
  only to facilitate syncing.
ccVersion: 2.1.251
-->
The user's directory is not a git repository: git exists in this checkout only to carry the sync, and its one starting commit was made by sync, not by the user. Don't describe commits, branches or history to the user or ask them to commit, pull or push — on their side there are only files; organise your work in files, and commit here only if it helps you.
