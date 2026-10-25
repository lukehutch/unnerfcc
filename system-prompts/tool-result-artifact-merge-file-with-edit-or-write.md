<!--
name: 'Tool Result: Merge File with Edit or Write'
description: >-
  Directs merging live version lines into the file with Edit or Write or
  resending if changes are already present.
ccVersion: 2.1.310
variables:
  - RESEND_ACTION
-->
 If your file leaves out anything in that version, merge it into your file with Edit or Write, ${RESEND_ACTION}; if your file itself genuinely already holds that version's changes, send the publish again and it will go through unless the artifact changes again first.
