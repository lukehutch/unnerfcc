<!--
name: 'Tool Result: Artifact publish writeback failed prefix'
description: >-
  Warns that writing published edits back to disk failed and the file may be
  partly written.
ccVersion: 2.1.310
variables:
  - ERROR_MESSAGE
  - PUBLISHED_TEXT_SNIPPET
-->
${ERROR_MESSAGE}: writing it back failed, and the file may be partly written. Read it before anything else, restore it to the published text (${PUBLISHED_TEXT_SNIPPET}, 
