<!--
name: 'Tool Description: Self-hosted runner metrics'
description: >-
  Describes the typed doctor tool that reads the local runner's /metrics
  endpoint and parses the Prometheus gauges into capacity, session, and poll-age
  fields.
ccVersion: 2.1.231
-->
GET http://127.0.0.1:{health_port}/metrics on the local runner and parse the `claude_code_self_hosted_runner_*` Prometheus gauges into {capacity, active_sessions, last_poll_age_seconds, locked_account_email?}.
