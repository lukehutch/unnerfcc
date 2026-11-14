<!--
name: 'Tool Description: Self-hosted runner try-out launch short guidance'
description: >-
  Directs using the try-out launch tool instead of a plain shell launch on
  laptops where /workspace is unwritable.
ccVersion: 2.1.325
variables:
  - BASH_TOOL_NAME
-->
When you are about to start a self-hosted runner on this machine for a first try-out, use it and not a plain ${BASH_TOOL_NAME} launch, whose default /workspace folder is unwritable on laptops; for production deployment, explain the steps instead.
