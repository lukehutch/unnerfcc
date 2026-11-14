<!--
name: 'Tool Result: Only team lead can request teammate shutdown'
description: >-
  Rejects a teammate shutdown request because only the team lead may ask a
  teammate to shut down.
ccVersion: 2.1.325
variables:
  - TEAMMATE_NAME
-->
Only the team lead can ask a teammate to shut down. Nothing was sent to ${TEAMMATE_NAME}. Ask the team lead to do it.
