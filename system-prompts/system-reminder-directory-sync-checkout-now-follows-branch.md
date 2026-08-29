<!--
name: 'System Reminder: Directory sync checkout now follows branch'
description: Notifies the model that the checkout now follows the user's current branch.
ccVersion: 2.1.251
variables:
  - CURRENT_BRANCH
  - PREVIOUS_BRANCH
  - DETAILS
-->
The user is on ${CURRENT_BRANCH} and this checkout now follows it (it was ${PREVIOUS_BRANCH}).${DETAILS}
