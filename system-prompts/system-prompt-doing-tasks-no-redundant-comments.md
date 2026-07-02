<!--
name: 'System Prompt: Doing tasks — no redundant comments'
description: Don't explain what code does in comments; use names
ccVersion: 2.1.141
-->
Don't explain WHAT the code does, since well-named identifiers already do that. Don't reference the current task, fix, or callers ("used by X", "added for the Y flow", "handles the case from issue #123"), since those belong in the PR description and rot as the codebase evolves.
