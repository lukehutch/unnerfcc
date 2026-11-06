<!--
name: 'Tool Result: User disconnected remote folder'
description: >-
  Reports that the user disconnected the remote folder and directs continuing
  work without it.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - ATTACHED_FOLDER
-->
The person at ${MACHINE_NAME} disconnected this session from the folder it was using there. Nothing on ${MACHINE_NAME} is down. Do the rest of the task without ${MACHINE_NAME} and tell the user what that leaves undone; ask for the folder again only if the user wants you to. Do not call ${MACHINE_NAME} with "${ATTACHED_FOLDER}" until it is attached again.
