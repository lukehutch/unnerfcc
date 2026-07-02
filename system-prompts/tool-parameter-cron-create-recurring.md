<!--
name: CronCreate recurring parameter
description: >-
  input_schema param description for the CronCreate tool's recurring field;
  serialized into the model's tool list, so model-facing.
ccVersion: 2.1.191
variables:
  - TOOL_PARAMETER_CRON_CREATE_RECURRING_VAR_0
-->
true (default) = fire on every cron match until deleted or auto-expired after ${TOOL_PARAMETER_CRON_CREATE_RECURRING_VAR_0} days. false = fire once at the next match, then auto-delete. Use false for "remind me at X" one-shot requests with pinned minute/hour/dom/month.
