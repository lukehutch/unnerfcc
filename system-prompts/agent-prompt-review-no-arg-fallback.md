<!--
name: Review No-Arg Fallback
description: >-
  Model-facing /review no-argument fallback prompt instructing the model to run
  gh pr list to show open pull requests.
ccVersion: 2.1.191
-->
Run `gh pr list` to show the open pull requests, then ask the user which one to review (`/review <number>`).
