<!--
name: 'Tool Result: Memory write version token invalid'
description: >-
  Rejects a memory write whose if_version is not a version token and reports the
  document's current version.
ccVersion: 2.1.231
variables:
  - VERSION_TOKEN_GUIDANCE
  - CURRENT_VERSION
-->
${VERSION_TOKEN_GUIDANCE} It currently exists at version ${CURRENT_VERSION}.
