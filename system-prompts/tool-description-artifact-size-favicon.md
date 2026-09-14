<!--
name: 'Tool Description: Artifact size limit and favicon'
description: >-
  Details the artifact size limit, embedded rules, and required emoji favicon
  parameter.
ccVersion: 2.1.270
variables:
  - RESPONSIVE_SECTION
  - THEME_SECTION
-->
MB or smaller, and embedded data: URIs count toward that.

${RESPONSIVE_SECTION}

${THEME_SECTION}

**Favicon** (required on a first publish): Pass one or two emoji as `favicon` (e.g. `"📊"`, `"🐛"`, `"⚡🔥"`). It marks the artifact in artifact lists and cards. Emoji only — no SVG, no markup. It stays the **same** for the life of an artifact — users recognize the artifact by it, and a changed one reads as a different page — so on a redeploy (the same file path this session, or `url`) omit `favicon` and the artifact keeps the emoji it has; pass a different one only when the user asks for a new emoji.

**Icon** (optional): Pass one short generic word as `icon` (e.g. `"chart"`, `"calendar"`, `"recipe"`) — a plain signifier for what the page is, never a product or brand name. It stays put like the favicon: on a redeploy omit `icon` and the artifact keeps the one it has.
