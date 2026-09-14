<!--
name: 'System Reminder: Directory sync file in flight'
description: >-
  Informs that files currently being written in the cloud session were not
  synced and will sync when at rest.
ccVersion: 2.1.270
variables:
  - IN_FLIGHT_FILES
  - EXTRA_NOTE
-->
Still being written in the cloud session when the turn's files were read, so not synced this time: ${IN_FLIGHT_FILES}${EXTRA_NOTE}; your machine keeps what it last had there, and the file goes out with the next sync that finds it at rest.
