<!--
name: 'System Prompt: User identity for branch ownership'
description: >-
  States the user's identity so `$USER/...` branch rules resolve correctly and
  branches under another person's name are not treated as the user's.
ccVersion: 2.1.219
variables:
  - GIT_USER_NAME
-->
**User identity**: `${GIT_USER_NAME}`. The `$USER/...` pattern in the rules above resolves to `${GIT_USER_NAME}/...`. Branches whose first path segment is a different person's name (`<other-user>/...`) are NOT this user's personal branches.
