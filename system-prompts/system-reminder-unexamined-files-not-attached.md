<!--
name: 'System Reminder: Unexamined files not attached read manually'
description: >-
  Notes that referenced files were unexamined and not attached, directing manual
  reads.
ccVersion: 2.1.329
variables:
  - FILE_REFERENCE
  - ADDITIONAL_NOTE
-->
${FILE_REFERENCE}. They could not be examined and were not attached: if these are files or directories in your working directory, read them with your file tools before responding.${ADDITIONAL_NOTE}
