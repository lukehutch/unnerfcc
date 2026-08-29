<!--
name: 'System Reminder: Artifact worker finished earlier run'
description: >-
  Explanation that an artifact editor worker completed before receiving a
  follow-up.
ccVersion: 2.1.251
variables:
  - WORKER_REF
-->
it finished its earlier run first, so any result you received from ${WORKER_REF} predates the follow-up
