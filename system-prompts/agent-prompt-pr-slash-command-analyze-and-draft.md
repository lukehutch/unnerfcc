<!--
name: 'Agent Prompt: PR slash command (analyze and draft)'
description: >-
  Step 1 of the PR slash-command prompt — analyze every commit since the base
  branch and draft a short title with the detail in the body.
ccVersion: 2.1.231
variables:
  - BASE_BRANCH
-->

## Your task

Based on the changes above, open a single pull request:

1. Analyze ALL changes that will be included in the PR (every commit since ${BASE_BRANCH}, not just the latest), then draft a title and body:
   - Keep the title short (under 70 characters); put detail in the body
