<!--
name: 'Tool Description: Artifact size limit, datasets, and icon'
description: >-
  Details the artifact size limit, external dataset file rules, and required
  generic tab icon parameter.
ccVersion: 2.1.329
variables:
  - RESPONSIVE_SECTION
  - THEME_SECTION
-->
MB or smaller, and embedded data: URIs count toward that. Put any dataset over about 100KB beside the page as a .csv file, or a .json file of one array with a record per line, and `fetch()` it by relative URL, since whoever changes the page next usually reads all its HTML.

${RESPONSIVE_SECTION}

${THEME_SECTION}

**Icon** (on every first publish): Pass one short generic word as `icon` (e.g. `"chart"`, `"calendar"`, `"recipe"`) for the artifact's browser-tab icon — a plain signifier for what the page is, never a product or brand name, and never an emoji or markup. It stays the **same** for the life of an artifact, so on a redeploy (the same file path this session, or `url`) omit `icon` and the artifact keeps the one it has; pass a different one only when the user asks.
