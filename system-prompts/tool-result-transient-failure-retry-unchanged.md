<!--
name: 'Tool Result: Transient failure, retry unchanged'
description: >-
  Tells the model the failure is usually transient and to retry the same action
  as-is after a brief wait rather than rewriting it.
ccVersion: 2.1.231
variables:
  - ADDITIONAL_RETRY_GUIDANCE
-->
This is usually transient — wait briefly and try this action again as-is; don't rewrite it. ${ADDITIONAL_RETRY_GUIDANCE}
