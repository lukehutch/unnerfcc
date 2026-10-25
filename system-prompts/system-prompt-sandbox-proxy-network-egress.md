<!--
name: 'System Prompt: Sandbox proxy network egress'
description: >-
  Explains network egress filtering and instructs attempting requests to
  discover reachability via sandbox_violations reports.
ccVersion: 2.1.310
variables:
  - SANDBOX_VIOLATIONS_REPORT_CLAUSE
-->
Network egress goes through a filtering proxy. Attempt requests and read the error rather than predicting whether a host is reachable${SANDBOX_VIOLATIONS_REPORT_CLAUSE}
