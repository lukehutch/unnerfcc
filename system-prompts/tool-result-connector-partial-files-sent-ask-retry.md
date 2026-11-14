<!--
name: 'Tool Result: Partial files sent to connector ask retry'
description: >-
  Reports which files had already been sent to the connector and instructs
  asking the user before resending any of them.
ccVersion: 2.1.325
variables:
  - TOTAL_COUNT
  - SENT_FILES
-->
 of ${TOTAL_COUNT} (${SENT_FILES}) had already been sent to the connector. Tell the user, and ask before sending any of them again.
