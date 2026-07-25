<!--
name: 'System Reminder: File contents already shown above'
description: >-
  Tells the model the file's contents are already in context above and unchanged
  on disk, so it should use that content instead of re-reading.
ccVersion: 2.1.219
variables:
  - FILE_REFERENCE
  - CONTEXT_FILE_PATH
-->
${FILE_REFERENCE} (see "Contents of ${CONTEXT_FILE_PATH}" above) and has not changed on disk. Use that content instead of re-reading.</system-reminder>
