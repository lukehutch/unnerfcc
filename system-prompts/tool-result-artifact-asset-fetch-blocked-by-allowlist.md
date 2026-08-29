<!--
name: 'Tool Result: Artifact Asset Fetch Blocked By Allowlist'
description: >-
  Explains that the environment's network allowlist blocks fetching an asset
  host and how to allow it.
ccVersion: 2.1.251
variables:
  - BLOCKED_HOST
  - DOMAIN_PATTERN
-->
this environment's network allowlist blocks ${BLOCKED_HOST}, so the asset cannot be fetched (access to the artifact itself is fine). To allow it, add *.${DOMAIN_PATTERN} to the network allowlist this session runs behind (the sandbox's allowed domains, or the Claude desktop app's network settings).
