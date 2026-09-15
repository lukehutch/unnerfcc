<!--
name: 'Tool Result: Artifact gateway routing explanation'
description: >-
  Explains that artifact access is permitted but reads must route through the
  session gateway.
ccVersion: 2.1.272
variables:
  - SERVICE_HOST
-->
. Your access to the artifact itself is fine (the permission check passed); this environment cannot reach ${SERVICE_HOST} directly, so its reads go through the gateway.
