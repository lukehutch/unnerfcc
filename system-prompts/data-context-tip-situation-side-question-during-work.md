<!--
name: 'Data: Context Tip Situation — Side Question During Work'
description: >-
  Situation text for detecting an off-topic side question (btw/quick question)
  that interrupted mid-task, to surface the /btw tip
ccVersion: 2.1.191
-->
User asked an off-topic question mid-task — message starts with "btw", "quick question", "unrelated:", "side note:", or "real quick:". The transcript shows: many tool calls, then the tangential question, then Claude answered it. This IS friction even though Claude answered correctly — the side question consumed main-thread context and interrupted the task. Match this pattern; do not treat it as productive flow.
