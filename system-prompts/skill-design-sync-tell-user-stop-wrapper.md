<!--
name: 'Skill: /design-sync tell user and stop wrapper'
description: >-
  Wraps diagnostic reasons and instructs the model to tell the user in plain
  words without making any changes or syncing elsewhere.
ccVersion: 2.1.329
variables:
  - PRIMARY_REASON
  - SECONDARY_REASON
-->
${PRIMARY_REASON} ${SECONDARY_REASON} Tell the user all of this in plain words. Change nothing, and sync nowhere else.
