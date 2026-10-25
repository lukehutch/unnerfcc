<!--
name: 'Tool Result: Session now working in the worktree'
description: >-
  Confirms the session has moved into the new worktree and explains that
  ExitWorktree leaves mid-session while exiting the session prompts for cleanup.
ccVersion: 2.1.310
variables:
  - WORKTREE_CREATED_MESSAGE
  - ADDITIONAL_NOTE_1
  - ADDITIONAL_NOTE_2
  - EXIT_GUIDANCE
-->
${WORKTREE_CREATED_MESSAGE}.${ADDITIONAL_NOTE_1}${ADDITIONAL_NOTE_2} The session is now working in the worktree. ${EXIT_GUIDANCE}
