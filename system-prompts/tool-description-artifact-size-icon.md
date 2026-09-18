<!--
name: 'Tool Description: Artifact size limit and icon'
description: >-
  Details the artifact size limit, embedded rules, and required generic tab icon
  parameter.
ccVersion: 2.1.277
variables:
  - RESPONSIVE_SECTION
  - THEME_SECTION
-->
MB or smaller, and embedded data: URIs count toward that.

${RESPONSIVE_SECTION}

${THEME_SECTION}

**Icon** (on every first publish): Pass one short generic word as `icon` (e.g. `"chart"`, `"calendar"`, `"recipe"`) for the artifact's browser-tab icon — a plain signifier for what the page is, never a product or brand name, and never an emoji or markup. It stays the **same** for the life of an artifact, so on a redeploy (the same file path this session, or `url`) omit `icon` and the artifact keeps the one it has; pass a different one only when the user asks.
