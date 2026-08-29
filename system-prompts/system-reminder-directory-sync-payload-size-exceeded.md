<!--
name: 'System Reminder: Directory sync payload size exceeded'
description: >-
  Informs the model that the sync payload exceeds size limits, lists the largest
  files, and details how to remove them from history or staging.
ccVersion: 2.1.251
variables:
  - LARGEST_FILES
-->
 MiB) is too large to send to the user's machine; the largest files in it: ${LARGEST_FILES}. NOTHING from this turn reaches the user until those blobs are out of what is sent. For a file a commit brought in: git rm --cached FILE, add it to .gitignore (or delete it), then git commit --amend (or an interactive rebase if the commit is older) — deleting it in a NEW commit does not help, the blob stays in history. For an uncommitted or staged file: unstage it (git rm --cached) or delete it, and add it to .gitignore.
