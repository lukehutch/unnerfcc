<!--
name: 'Tool Result: Artifact publish edits current text recovery'
description: >-
  Shows the file's current text after a failed edit so the model can copy
  old_str exactly.
ccVersion: 2.1.310
variables:
  - ERROR_MESSAGE
  - FILE_CONTENT
-->
${ERROR_MESSAGE} The file's current text follows; copy old_str from it exactly and send the publish again.

${FILE_CONTENT}
