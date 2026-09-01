<!--
name: 'Tool Result: Artifact allowlist blocks content host'
description: >-
  Notifies that the network allowlist blocks the artifact content host so live
  version cannot be read until domain is added.
ccVersion: 2.1.257
variables:
  - ALLOWED_DOMAIN
-->
This environment's network allowlist blocks the artifact content host, so the live version can be neither read nor handed over here until ${ALLOWED_DOMAIN} is added at environment settings → Code → Network access → Custom → Allowed domains. An admin can add the same entry to a shared environment from admin settings → Cloud environments; sessions that run in that environment get the access. Tell the user, and publish again only once you can build on the live version.
