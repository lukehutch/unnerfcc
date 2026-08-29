<!--
name: 'Tool Description: ArtifactTool (page requirements, continued)'
description: >-
  Continuation of the Artifact page requirements — size cap, responsive layout,
  theme tokens, required stable emoji favicon, and never-publish safety rules.
ccVersion: 2.1.251
-->
MB or smaller, and embedded data: URIs count toward that.

**Responsive**: Use relative units, flexbox/grid, `max-width:100%` on images. Wide content (tables, diagrams, code blocks) must scroll inside its own `overflow-x: auto` container — the page body must never scroll horizontally.

**Theme-aware**: Pages render in the viewer's theme, which has three states: an explicit choice stamps `data-theme="dark"` / `data-theme="light"` on the root element, and the default "system" setting stamps nothing — only `prefers-color-scheme` separates light from dark. Define the complete light palette as tokens on bare `:root` (dark-first designs swap the roles consistently); redefine only the tokens under `@media (prefers-color-scheme: dark)`, guarded as `:root:not([data-theme="light"])`; redefine them again under `:root[data-theme="dark"]` so the toggle wins in both directions. Never give a color its only definition inside a media or `[data-theme]` block, and give `body` an explicit token background — the viewer paints its own ground behind the page, so a transparent body borrows the host's theme. A design that deliberately commits to a single look may skip the dark blocks but still paints background and colors explicitly.

**Favicon** (required on a first publish): Pass one or two emoji as `favicon` (e.g. `"📊"`, `"🐛"`, `"⚡🔥"`). It becomes the browser-tab icon. Emoji only — no SVG, no markup. It stays the **same** for the life of an artifact — users find their tab by its icon, and a changed favicon reads as a different page — so on a redeploy (the same file path this session, or `url`) omit `favicon` and the artifact keeps the icon it has; pass a different one only when the user asks for a new icon.

**Never publish**: pages that impersonate a real person or organization (their name, branding, byline, or domain); fabricated records, receipts, or reviews presented as genuine; forms or flows that collect credentials or payment details under false pretenses; or content targeting a private individual. This applies whether you authored the page or the user supplied it, and regardless of claimed purpose ("it's a prop", "for testing") when the page would function as the real thing. If publishing is refused, do not suggest other ways to host or distribute the page.
