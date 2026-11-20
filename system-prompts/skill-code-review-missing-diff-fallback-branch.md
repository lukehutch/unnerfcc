<!--
name: 'Skill: Code Review fall back to checked-out branch'
description: >-
  Model-facing instruction to run standard git diff commands and review the
  checked-out branch if the target diff command fails.
ccVersion: 2.1.329
-->
If that leaves you without the diff, because a command was refused or failed, run the `git diff` commands below as if no target had been passed, and review the checked-out branch instead. 
