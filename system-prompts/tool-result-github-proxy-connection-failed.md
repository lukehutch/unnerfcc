<!--
name: 'Tool Result: GitHub Proxy Connection Failed'
description: >-
  Informs that the GitHub proxy connection failed temporarily and suggests
  waiting before retrying.
ccVersion: 2.1.310
variables:
  - ERROR_DETAILS
  - WAIT_DURATION
-->
this session's GitHub proxy could not open the connection (${ERROR_DETAILS}); nothing was sent. This can be temporary: wait ${WAIT_DURATION} and run the command once more. 
