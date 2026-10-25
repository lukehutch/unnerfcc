<!--
name: 'Tool Description: Agent Effort Guidance'
description: >-
  Guidance on setting agent reasoning effort to lower or higher based on task
  complexity and parallelism.
ccVersion: 2.1.310
-->

- When you fan work out in parallel, give each independent lookup `effort: "lower"` — that is where the step cheaper pays most. More generally, pass `"lower"` for any mechanical, self-checking brief (find-and-report, grep across named files, a pattern you spelled out); pass `"higher"` for a well-specified piece that needs more reasoning than the work around it.
