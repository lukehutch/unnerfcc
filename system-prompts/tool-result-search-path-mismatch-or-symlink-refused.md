<!--
name: 'Tool Result: Refusing to search mismatched or symlinked path'
description: >-
  Model-facing tool result refusing to search a path due to a symlink or target
  mismatch and asking for the direct path without links.
ccVersion: 2.1.329
variables:
  - TARGET_PATH
-->
Refusing to search ${TARGET_PATH}: what was opened is not what this path names now (a link on the way may lead into another process's view of the files, or to a deleted file), or this could not be checked. Give the file's or folder's own path, without links.
