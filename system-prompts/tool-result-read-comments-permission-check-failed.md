<!--
name: 'Tool Result: Read comments permission check failed'
description: >-
  Informs the model that the permission check to read artifact comments failed
  and suggests retrying once.
ccVersion: 2.1.310
variables:
  - REASON_PREFIX
-->
${REASON_PREFIX} and the permission check for this call couldn't finish. Try once more; if it fails again, tell the user the comments couldn't be read.
