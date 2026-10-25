<!--
name: 'System Reminder: Attached machine reconnected command state unknown'
description: >-
  Advises checking command outcome with a read-only command before resending
  after a machine reconnected.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - STATUS_DETAILS
-->
- ${MACHINE_NAME}${STATUS_DETAILS}. Nothing was replayed. This session cannot tell whether a command that was running on ${MACHINE_NAME} when it went quiet has finished, is still running, or never ran: before sending any such command again, look at what it did on ${MACHINE_NAME} with a read-only command. Anything else that needs ${MACHINE_NAME} you may send now, once the step you are on is done.
