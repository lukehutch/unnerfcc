<!--
name: 'System Reminder: Directory sync hard reset restore guidance'
description: >-
  Instructions on comparing against the latest snapshot ref and restoring
  untouched files after a hard reset.
ccVersion: 2.1.277
variables:
  - SNAPSHOT_QUERY_COMMAND
-->
 (after a hard reset, compare the files with the user's own as last synced here: ${SNAPSHOT_QUERY_COMMAND}; then `git diff <that ref>`, and restore from that snapshot any path you did not deliberately change (`git checkout <that ref> -- <path>`))
