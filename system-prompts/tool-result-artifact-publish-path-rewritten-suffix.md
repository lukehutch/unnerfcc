<!--
name: 'Tool Result: Artifact Publish Path Rewritten Suffix'
description: >-
  Suffix explaining that the publish path was altered by an external hook or
  host and advising on next steps.
ccVersion: 2.1.270
variables:
  - REWRITTEN_PATH
-->
 ${REWRITTEN_PATH} (usually by a hook or SDK host), so nothing was published. Do not retry this call; if the new path is the file you mean, publish it in a new call, otherwise tell the user.
