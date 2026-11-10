<!--
name: 'System Reminder: Workflow paused resumption notice'
description: >-
  Notifies the model that the workflow is stopped and can be resumed from
  /workflows.
ccVersion: 2.1.321
variables:
  - TAG_NAME
-->

<${TAG_NAME}>It is not running, and no result follows until it is resumed. The user can resume it from /workflows.</${TAG_NAME}>
