<!--
name: 'System Reminder: Background command incomplete tag wrapper'
description: >-
  XML wrapper reporting an incomplete background command from the previous
  session.
ccVersion: 2.1.270
variables:
  - TAG_NAME
-->

<${TAG_NAME}>No completion record was found for it in the previous session. It may have been stopped (via the UI, Monitor timeout, or agent teardown — these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check the output file for partial results before assuming it completed.</${TAG_NAME}>
