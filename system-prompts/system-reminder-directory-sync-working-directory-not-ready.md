<!--
name: 'System Reminder: Directory sync working directory not ready'
description: >-
  Informs the model that the working directory is not yet populated with user
  files and instructs not to create files or commits.
ccVersion: 2.1.251
-->
Directory sync: this working directory does NOT yet hold the user's files (it is empty, or holds only part of them) — their machine is still uploading them, or the upload was interrupted. Say so if the user refers to their files, and do NOT create project files or commits here (any git repository you see is sync's placeholder): their files are put in place at a later turn once the upload completes.
