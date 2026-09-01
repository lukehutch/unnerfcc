<!--
name: 'Tool Description: Artifact size limit and favicon'
description: >-
  Details the artifact size limit, embedded rules, and required emoji favicon
  parameter.
ccVersion: 2.1.257
variables:
  - RESPONSIVE_SECTION
  - THEME_SECTION
-->
MB or smaller, and embedded data: URIs count toward that.

${RESPONSIVE_SECTION}

${THEME_SECTION}

**Favicon** (required on a first publish): Pass one or two emoji as `favicon` (e.g. `"📊"`, `"🐛"`, `"⚡🔥"`). It becomes the browser-tab icon. Emoji only — no SVG, no markup. It stays the **same** for the life of an artifact — users find their tab by its icon, and a changed favicon reads as a different page — so on a redeploy (the same file path this session, or `url`) omit `favicon` and the artifact keeps the icon it has; pass a different one only when the user asks for a new icon.
