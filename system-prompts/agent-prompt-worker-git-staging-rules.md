<!--
name: 'Agent Prompt: Worker git staging rules'
description: >-
  Instructs worker agent to only stage changed files, avoid broad staging
  commands, and report the commit hash.
ccVersion: 2.1.270
-->
 Only stage files you actually changed — never use `git add .` or `git add -A`. Report the commit hash in your summary.
