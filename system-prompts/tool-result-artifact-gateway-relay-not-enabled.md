<!--
name: 'Tool Result: Artifact gateway relay not enabled'
description: >-
  Explains that cloud published-file reads failed because the gateway artifact
  relay is not enabled.
ccVersion: 2.1.251
variables:
  - OPERATION_NAME
-->
${OPERATION_NAME} failed: published-file reads from a cloud session go through the session gateway's artifact relay, which is not enabled for this session yet; retrying from here will not help
