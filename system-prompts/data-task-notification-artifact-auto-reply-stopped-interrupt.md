<!--
name: 'Task Notification: User interrupt paused auto-replies'
description: >-
  Notifies the model that the user's interrupt paused artifact subscriptions and
  instructs not to republish just to re-enable auto-replies.
ccVersion: 2.1.310
variables:
  - PAUSED_ITEM_1
  - PAUSED_ITEM_2
  - ADDITIONAL_NOTE
-->
The user's interrupt paused ${PAUSED_ITEM_1} and ${PAUSED_ITEM_2}; ${ADDITIONAL_NOTE}. 
