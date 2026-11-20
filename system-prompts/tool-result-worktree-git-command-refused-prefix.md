<!--
name: 'Tool Result: Worktree git command refused prefix'
description: >-
  Formats a refusal message for a git command that could affect outside the
  isolated worktree.
ccVersion: 2.1.329
variables:
  - SUBJECT_LABEL
  - WORKTREE_PATH
  - VIOLATION_REASON
  - ALTERNATIVE_OR_SUBJECT
-->
${SUBJECT_LABEL} is isolated in the worktree ${WORKTREE_PATH}, but this command ${VIOLATION_REASON}. Refusing to run it — ${ALTERNATIVE_OR_SUBJECT} git 
