<!--
name: 'Tool Result: SendMessage delivery unconfirmed'
description: >-
  Model-facing tool result warning that sending to a target session was not
  confirmed and instructing not to resend unless delivery is known to have
  failed.
ccVersion: 2.1.329
variables:
  - TARGET_SESSION
  - FAILURE_REASON
-->
Sending to ${TARGET_SESSION} was not confirmed (${FAILURE_REASON}), so the message may have arrived. Do not send it again unless you learn that it did not arrive, or that session may get it twice. Tell your user, or check with that session later.
