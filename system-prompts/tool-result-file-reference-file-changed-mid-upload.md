<!--
name: 'Tool Result: File Reference File Changed Mid-Upload'
description: >-
  Reports that the file changed after being checked, directing SHA-256
  recomputation and retry.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
${FILE_PATH} changed after it was checked, so nothing was uploaded. Compute its SHA-256 again and make the call again. If it changes again, tell the user.
