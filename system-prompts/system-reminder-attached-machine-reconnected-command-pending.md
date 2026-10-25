<!--
name: 'System Reminder: Attached machine reconnected with pending command'
description: >-
  Advises that an attached machine reconnected but an unconfirmed command may
  still be running, so do not resend without checking.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - RECONNECT_TIME
  - EXTRA_STATUS
-->
- ${MACHINE_NAME}${RECONNECT_TIME}${EXTRA_STATUS}. Nothing was replayed. A command this session stopped waiting for may be running on ${MACHINE_NAME} right now: do not send it again, and do not take "not done yet" to mean it did not run. If its outcome comes in, a correction note will say what became of it. If none has come by the time you need to know, look at what it did on ${MACHINE_NAME} with a read-only command before deciding anything about it. Anything else that needs ${MACHINE_NAME} you may send now, once the step you are on is done.
