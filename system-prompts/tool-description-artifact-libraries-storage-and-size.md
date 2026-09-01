<!--
name: 'Tool Description: Artifact libraries, storage, and size'
description: >-
  Explains how to load external libraries, use browser storage, and size limits
  for artifacts.
ccVersion: 2.1.257
variables:
  - CDN_NOTE
-->
${CDN_NOTE} **How to load a library**: `<script src="https://cdnjs.cloudflare.com/ajax/libs/<lib>/<exact version>/<file>">` — pick the UMD build, which defines a global (e.g. react/18.3.1/umd/react.production.min.js, then react-dom) — placed BEFORE any inline `<script>` that uses it; always pin an exact version. The viewer's sandbox also blocks any download the page starts itself — `<a download>` links (data:/blob: hrefs included) and script-driven saves are inert for viewers — so never offer a file through a plain link. Artifacts render mermaid diagrams natively — markdown via ```mermaid fences, HTML via `<pre class="mermaid">` blocks — no library needed, don't load one.

**Browser storage**: `localStorage` works (so do `sessionStorage` and IndexedDB). Each artifact is served from its own origin, so what a page stores is private to that artifact, survives republishes to the same URL, and lives only in that viewer's browser — it never reaches other viewers, the viewer's other devices, or Claude. It can come back empty (a private window, cleared site data, a different browser), and in some contexts the accessor itself throws (thumbnail capture, previews, browsers set to block site data) — so wrap every read and write in try/catch and render the page correctly with no stored value. Use it for lightweight per-viewer conveniences — a remembered tab or filter, a collapsed section, an unsent draft. It is not the place for anything that must persist reliably, be shared between viewers, or be read back later by Claude.

**Size**: The rendered page must be 
