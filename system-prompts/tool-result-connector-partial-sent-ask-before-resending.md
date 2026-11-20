<!--
name: 'Tool Result: Partial files sent ask before resending'
description: >-
  Model-facing notice reporting how many files were sent and instructing to tell
  the user and ask before sending any again.
ccVersion: 2.1.329
variables:
  - SENT_COUNT
  - ALREADY_SENT_DETAILS
-->
 of ${SENT_COUNT} ${ALREADY_SENT_DETAILS} Tell the user, and ask before sending any of them again.
