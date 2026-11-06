<!--
name: 'System Reminder: Claude Doc comments unregistered wake'
description: >-
  Warns that @Claude comments on the specified doc route to another instance
  because comment wake was not registered.
ccVersion: 2.1.318
variables:
  - DOC_NAME
  - REASON
-->
@Claude comments on the Claude Doc ${DOC_NAME} go to another Claude and will not reach this session: its comment wake was not registered (${REASON}).
