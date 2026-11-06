<!--
name: 'Agent Prompt: Send to project repository attach instructions'
description: >-
  Instructions on when to pass attach_git_remote based on whether the folder has
  a GitHub origin.
ccVersion: 2.1.318
-->


## Repository

Pass `attach_git_remote: true` when this folder has a GitHub origin and the work happened in it; otherwise `false`. The folder’s context says what the CLI found about the origin. The project starts with that repository only; threads start from what is on GitHub.
