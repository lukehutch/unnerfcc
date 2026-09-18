<!--
name: 'System Reminder: Directory sync restore unstaled paths advice'
description: >-
  Advises diffing against the snapshot ref and restoring untouched paths to
  avoid reverting user changes.
ccVersion: 2.1.277
variables:
  - SNAPSHOT_QUERY_COMMAND
-->
; then compare the files with the user's own as last synced here, uncommitted work included: ${SNAPSHOT_QUERY_COMMAND}; then `git diff <that ref>`, and restore from that snapshot every path you did not deliberately change (`git checkout <that ref> -- <path>`) — left stale, those paths would reach the user's machine as reverts of their newer work
