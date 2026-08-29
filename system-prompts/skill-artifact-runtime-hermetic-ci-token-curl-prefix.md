<!--
name: 'Skill: Fetch connectors via curl in CI/hermetic sessions (prefix)'
description: >-
  Instructions for discovering connectors via curl when OAuth token is set in
  CI/hermetic sessions.
ccVersion: 2.1.251
-->
 In hermetic/CI sessions where connectors aren't loaded but `$CLAUDE_CODE_OAUTH_TOKEN` is set, fetch the list via Bash: `curl -H 'anthropic-version: 2023-06-01' -H 'anthropic-beta: 
