<!--
name: 'Tool Parameter: Monitor command expiry clause'
description: Explains when the command monitor expires unless terminated earlier.
ccVersion: 2.1.310
variables:
  - EXPIRATION_DURATION
-->
expires in ${EXPIRATION_DURATION} unless the command exits first, and may stop soon after your reply
