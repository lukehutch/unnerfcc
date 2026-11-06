<!--
name: 'Tool Result: File reference read error'
description: Reports that a referenced file could not be read and instructs retrying once.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - REASON
-->
${FILE_PATH} couldn't be read just now, ${REASON} Make the call once more; if it fails again, tell the user.
