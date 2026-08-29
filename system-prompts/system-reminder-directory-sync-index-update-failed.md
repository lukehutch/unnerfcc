<!--
name: 'System Reminder: Directory sync index update failed'
description: >-
  Warns that git staging index could not mirror the user's staging and instructs
  how to reset it.
ccVersion: 2.1.251
-->
The index could not be updated to the user's staging, so `git status` may show stale staged changes; `git reset` (no arguments) re-synchronises it with HEAD without touching files.
