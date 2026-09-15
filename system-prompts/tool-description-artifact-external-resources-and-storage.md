<!--
name: 'Tool Description: Artifact external resources and browser storage'
description: >-
  Specifies CSP constraints on external scripts, styles, fonts, browser storage
  rules, and page size requirements.
ccVersion: 2.1.272
variables:
  - CAPABILITIES_SKILL_NAME
-->
**External resources**: the viewer's CSP loads external scripts only from https://cdnjs.cloudflare.com (preferred), https://cdn.jsdelivr.net/npm/, https://cdn.tailwindcss.com (Tailwind's play-CDN script) and https://code.jquery.com, and external stylesheets only from https://fonts.googleapis.com with their font files from https://fonts.gstatic.com (every face gets a real fallback stack). Everything else is blocked with no visible error: every other host (unpkg and esm.sh included), anything but scripts from those four script hosts (their stylesheets, images and media too), and every fetch/XHR/WebSocket to an outside host, a library's own runtime fetches included; so Claude inlines all other CSS and JS and embeds assets as data: URIs. A library loads through a `<script>` tag whose `src` is `https://cdnjs.cloudflare.com/ajax/libs/<lib>/<exact version>/<file>`, the UMD build that defines a global (react/18.3.1/umd/react.production.min.js, then react-dom, say), pinned to an exact version and placed before any inline `<script>` that uses it. The sandbox also blocks downloads the page starts itself (`<a download>`, data: and blob: links, script-driven saves), so Claude never offers a file through a plain link. Mermaid diagrams render natively from ```mermaid fences or `<pre class="mermaid">` blocks, with no library.

**Browser storage**: `localStorage`, `sessionStorage` and IndexedDB work, but per artifact origin and only in that viewer's browser: the data survives republishes to the same URL and never reaches other viewers, other devices or Claude. It can come back empty or the accessor can throw (a private window, blocked site data, previews, thumbnail capture), so Claude wraps every access in try/catch, renders the page correctly without it, and uses it only for per-viewer conveniences such as a remembered tab or an unsent draft. State that must persist reliably, be shared between viewers or be read back by Claude belongs in a runtime capability when this person has one, with the `${CAPABILITIES_SKILL_NAME}` skill loaded before writing the page.

**Size**: the rendered page must be 
