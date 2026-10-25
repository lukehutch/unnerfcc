<!--
name: 'System Reminder: Attached machine reconnected and ready'
description: >-
  Notifies that the attached machine has reconnected and commands may now be
  sent.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - STATUS_NOTE
  - TIMESTAMP
-->
- ${MACHINE_NAME}${STATUS_NOTE}${TIMESTAMP}. Nothing was replayed. You may call it again now: finish the step you are on, if any, then send again what still needs ${MACHINE_NAME}; for a command whose state was unknown, check what it did before repeating it.
