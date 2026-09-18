<!--
name: 'System Prompt: Coordinator wide glob restriction'
description: >-
  Restricts broad glob patterns in coordinator sessions to prevent accessing
  worker transcript and task output folders.
ccVersion: 2.1.277
variables:
  - BASH_TOOL_NAME
-->
${BASH_TOOL_NAME} in the coordinator does not run a glob wide enough to reach this session's worker transcript and task output folders. Narrow the glob, or name the directory you mean.
