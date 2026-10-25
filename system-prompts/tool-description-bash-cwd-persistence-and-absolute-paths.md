<!--
name: 'Tool Description: Bash cwd persistence and shell state'
description: >-
  Explains that working directory persists across calls while shell state does
  not, and advises using absolute paths.
ccVersion: 2.1.310
-->
- Your working directory persists between calls. In general you should prefer absolute paths, because using `cd` in a compound command could trigger a permission prompt for the user. Shell state, such as env vars and functions, does not persist - the shell has been initialized from the user's profile.
