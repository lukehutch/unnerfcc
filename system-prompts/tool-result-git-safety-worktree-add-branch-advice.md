<!--
name: 'Tool Result: Git safety worktree add branch advice'
description: >-
  Advises running git worktree add with -b to create a branch and running git
  worktree prune if needed.
ccVersion: 2.1.321
-->
Run it without that option, adding -b <new-branch> to make a new branch. If git says the path is registered but missing, run git worktree prune first.
