<!--
name: 'Tool Description: GitHub proxy create org repository command'
description: >-
  Example command for creating a private organization repository through the
  GitHub proxy.
ccVersion: 2.1.318
-->
gh api orgs/<org>/repos -f name=<name> -F private=true  # in an organization: an OWNER the command named is <org>, unless it is the login gh api user names
