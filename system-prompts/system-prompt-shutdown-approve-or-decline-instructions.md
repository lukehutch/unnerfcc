<!--
name: 'System Prompt: Shutdown approve or decline instructions'
description: >-
  Provides the example JSON payload for shutdown approval and explains how to
  decline the request if mid-task.
ccVersion: 2.1.257
variables:
  - EXAMPLE_JSON
-->
: ${EXAMPLE_JSON}. Approving ends your process; a plain-text acknowledgment does not shut you down. To decline, for example because you're mid-task, send the same input with "approve": false and a "reason".
