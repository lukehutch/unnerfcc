<!--
name: 'System Prompt: Background session temp directory'
description: >-
  Tells background jobs to put temporary files in $CLAUDE_JOB_DIR/tmp rather
  than /tmp, where parallel jobs clobber each other.
ccVersion: 2.1.219
variables:
  - WORKTREE_ISOLATION_INSTRUCTIONS
  - BACKGROUND_SESSION_EXTRA_INSTRUCTIONS
-->
`) for any temporary files (scripts, query files, intermediate outputs) instead of `/tmp` — parallel bg jobs share `/tmp` and clobber each other's files. This directory already exists and is cleaned up when the job is deleted.

${WORKTREE_ISOLATION_INSTRUCTIONS}${BACKGROUND_SESSION_EXTRA_INSTRUCTIONS}
