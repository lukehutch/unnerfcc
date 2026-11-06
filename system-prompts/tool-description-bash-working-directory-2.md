<!--
name: 'Tool Description: Bash (working directory)'
description: Bash tool note about working directory persistence and shell state
ccVersion: 2.1.318
-->
 Prefer absolute paths — `cd` in a compound command can trigger a permission prompt. Shell state (env vars, functions) does not persist; the shell is initialized from the user's profile.
