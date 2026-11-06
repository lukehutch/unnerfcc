<!--
name: 'Tool Result: Idle remote machine disconnected'
description: >-
  Explains that an idle remote machine disconnected to free capacity and guides
  re-requesting access.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - ATTACHED_FOLDER
-->
${MACHINE_NAME} stopped serving this session because the session had run nothing on it for a while: an idle computer frees its place for other sessions. Nothing on ${MACHINE_NAME} needs restarting and there is nothing to ask the user to fix. If the task still needs ${MACHINE_NAME}, look the user's computer folders up and ask for that folder again (the user approves the request); otherwise do the rest of the task without it. Do not call ${MACHINE_NAME} with "${ATTACHED_FOLDER}" until it is attached again.
