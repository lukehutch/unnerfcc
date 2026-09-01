<!--
name: 'Tool Result: Artifact network egress blocked in Cowork'
description: >-
  Explains that Cowork network egress settings block artifact reads and gives
  instructions for allowing domains in claude.ai settings.
ccVersion: 2.1.257
variables:
  - ALLOWED_DOMAIN
-->
This cloud session's network access follows the "Allow network egress" setting for Cowork in claude.ai, not an environment allowlist. To allow direct artifact reads here, an organization admin (or the user, on an individual plan) can turn that setting on and either allow all domains or add ${ALLOWED_DOMAIN} to its additional allowed domains.
