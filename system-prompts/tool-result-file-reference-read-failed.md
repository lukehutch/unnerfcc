<!--
name: 'Tool Result: File Reference Read Failed'
description: >-
  Reports that the referenced file could not be read and instructs retrying once
  before alerting the user.
ccVersion: 2.1.310
variables:
  - FILE_PATH
-->
${FILE_PATH} couldn't be read just now, so nothing was uploaded. Make the call once more; if it fails again, tell the user.
