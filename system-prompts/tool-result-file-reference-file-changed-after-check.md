<!--
name: 'Tool Result: File reference changed after check'
description: >-
  Warns that a referenced file changed after checking and instructs recomputing
  the hash.
ccVersion: 2.1.318
variables:
  - FILE_PATH
  - REASON
-->
${FILE_PATH} changed after it was checked, ${REASON} Compute its SHA-256 again and make the call again. If it changes again, tell the user.
