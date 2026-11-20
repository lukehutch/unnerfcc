<!--
name: 'System Reminder: Sandbox renamed .git symlink entries'
description: >-
  Model-facing warning that Claude Code renamed or deleted symlinked .git
  entries for sandbox safety and instructing not to rename them back.
ccVersion: 2.1.329
variables:
  - RENAME_SEPARATOR
-->
Claude Code renamed one or more entries in a .git folder so that git outside the sandbox does not follow them. Each now has a name like .<name>${RENAME_SEPARATOR}<hex> in the same folder. Past 100 in one folder, links at index.stash.<pid> or fast_import_crash_<pid> are deleted, not renamed; that may not have happened here. If one was an ignore list, attributes file or hook, it no longer applies. If one was a branch or HEAD, that branch may be missing or at an older commit, and git may report no repository or use one in a folder above. Check before committing. Do not rename them back: tell the user.
