<!--
name: 'Tool Description: Self-hosted environment summary short guidance'
description: >-
  Directs using the environment summary tool for overall runner counts and
  capacity, and specific tools for per-runner or per-session details.
ccVersion: 2.1.325
variables:
  - RUNNER_LIST_TOOL_NAME
  - SESSION_LIST_TOOL_NAME
-->
When you are about to say how a self-hosted environment is doing overall, such as live runner count, free capacity, or sessions waiting or unplaceable, use it; for each runner use ${RUNNER_LIST_TOOL_NAME}, for each session ${SESSION_LIST_TOOL_NAME}.
