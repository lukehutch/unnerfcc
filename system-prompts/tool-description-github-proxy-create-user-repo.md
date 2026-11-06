<!--
name: 'Tool Description: GitHub proxy create user repository command'
description: >-
  Example command for creating a private user repository through the GitHub
  proxy.
ccVersion: 2.1.318
-->
gh api user/repos -f name=<name> -F private=true  # in the account behind the credential (gh api user names it); this session's GitHub proxy may refuse creating a repository
