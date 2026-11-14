<!--
name: 'Tool Result: Git safety internal helper with double dash'
description: >-
  Model-facing git safety warning that a command resembles an internal git
  helper containing -- that may write outside the worktree.
ccVersion: 2.1.325
variables:
  - COMMAND_NAME
-->
names ${COMMAND_NAME}, which looks like one of git's internal helpers (a git command with -- in its name), some of which write outside the worktree
