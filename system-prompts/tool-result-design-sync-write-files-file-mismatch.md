<!--
name: 'Tool Result: Design sync file verification mismatch'
description: >-
  Explains that a file could not be opened matching its verified state and
  suggests retrying once.
ccVersion: 2.1.318
variables:
  - FILE_PATH
-->
write_files: the file at the localPath for ${FILE_PATH} could not be opened as the file that was checked (it may have been moved or replaced, or the system would not say which file was opened), so it was not read. Nothing in this call was uploaded. Try the call once more; if it fails again, stop and ask the user how to proceed.
