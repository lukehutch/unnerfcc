<!--
name: 'Skill: Code Review diff scope fallback'
description: >-
  Model-facing code-review instruction to include uncommitted changes via git
  diff HEAD or review a passed PR, branch, or file target.
ccVersion: 2.1.329
-->
If there are
uncommitted changes, or the range diff is empty, also run `git diff HEAD` and
include the working-tree changes in scope — the review often runs before the
commit. If a PR number, branch name, or file path was passed as an argument,
review that target instead. Treat this diff as the review scope.
