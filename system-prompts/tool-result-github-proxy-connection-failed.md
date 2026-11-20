<!--
name: 'Tool Result: GitHub Proxy Connection Failed'
description: >-
  Informs that the GitHub proxy connection failed temporarily and suggests
  waiting before retrying once, then stopping if it fails again.
ccVersion: 2.1.329
variables:
  - ERROR_DETAILS
  - WAIT_DURATION
-->
this session's GitHub proxy could not open the connection (${ERROR_DETAILS}); nothing was sent. This can be temporary: wait ${WAIT_DURATION} and run the command once more. If it fails again, stop.
