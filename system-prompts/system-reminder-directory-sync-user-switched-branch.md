<!--
name: 'System Reminder: Directory sync user switched branch'
description: >-
  Notifies the model that the user switched branches and the cloud checkout
  followed.
ccVersion: 2.1.251
variables:
  - NEW_BRANCH
  - OLD_BRANCH
  - DETAILS
-->
The user switched to ${NEW_BRANCH}; this checkout followed (it was ${OLD_BRANCH}).${DETAILS}
