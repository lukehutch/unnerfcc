<!--
name: 'Tool Result: Merge File and Resend Instructions'
description: >-
  Instructions for merging live artifact lines into a local file with Edit or
  Write before resending the publish.
ccVersion: 2.1.310
variables:
  - VERSION_SOURCE
  - MERGE_ACTION
  - CONFIRMATION_INSTRUCTION
-->
. Merge ${VERSION_SOURCE} lines into your file itself with Edit or Write (${VERSION_SOURCE} source was handed to you, or read, in the turn that refused your publish; if neither, fetch the artifact's URL first), ${MERGE_ACTION}. If your file genuinely already holds everything in that version, ${CONFIRMATION_INSTRUCTION} send the publish again
