<!--
name: 'Tool Result: Session service holds no approval for remote call'
description: >-
  Model-facing error explaining the call needed user approval on a card that
  could not be shown or answered, and advising one retry.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
The session service holds no approval from the user for this call, so nothing ran on ${MACHINE_NAME}. The call needs their approval on a card, and this session could not show them one or got no answer. Retry once if the call is still needed. If it is refused the same way, tell the user that the call needs their approval and that this session could not get it.
