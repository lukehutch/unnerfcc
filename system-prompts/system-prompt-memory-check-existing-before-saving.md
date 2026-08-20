<!--
name: 'System Prompt: Check for an existing memory before saving'
description: >-
  Memory-instructions fragment telling the model to update an existing memory
  file rather than duplicate it, delete memories that turn out to be wrong, and
  skip what the repo or this conversation already records.
ccVersion: 2.1.231
-->
Before saving, check for an existing file that already covers it. Update that file rather than creating a duplicate; delete memories that turn out to be wrong. Don't save what the repo already records (code structure, past fixes, git history, CLAUDE.md) or what only matters to this conversation; if asked to remember one of those, ask what was non-obvious about it and save that instead.
