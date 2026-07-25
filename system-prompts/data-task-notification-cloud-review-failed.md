<!--
name: 'Data: Cloud review failed task-notification'
description: task-notification XML reporting a failed cloud review and advising retry.
ccVersion: 2.1.219
variables:
  - SOURCE_TAG_NAME
  - STATUS_TAG_NAME
  - MESSAGE_TAG_NAME
  - FAILURE_MESSAGE
  - NOTIFICATION_TAG_NAME
-->
</${SOURCE_TAG_NAME}>
<${STATUS_TAG_NAME}>failed</${STATUS_TAG_NAME}>
<${MESSAGE_TAG_NAME}>${FAILURE_MESSAGE}</${MESSAGE_TAG_NAME}>
</${NOTIFICATION_TAG_NAME}>
