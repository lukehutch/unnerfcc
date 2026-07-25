<!--
name: Memory Write Path Conflict
description: >-
  Model-facing PostToolUse additionalContext telling the model its memory write
  was not saved because the path conflicts with an existing memory, and to
  re-read and rename or delete the conflicting one.
ccVersion: 2.1.219
-->
 was NOT saved to shared memory: its path conflicts with an existing memory (a file exists where this path needs a directory, or the reverse). Re-read the memory directory and rename this file, or delete the conflicting one, if the change is still wanted.
