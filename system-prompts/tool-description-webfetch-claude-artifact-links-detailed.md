<!--
name: 'Tool Description: WebFetch claude.ai artifact links detailed exception'
description: >-
  Explains that claude.ai artifact and preview links are fetchable via WebFetch
  using the claude.ai login instead of curl or headless browser.
ccVersion: 2.1.270
-->
- Exception: claude.ai artifact links (claude.ai/artifact/{id} or claude.ai/code/artifact/{uuid}, including preview.claude.ai) ARE fetchable — WebFetch uses your claude.ai login. Use WebFetch for these, not curl or a headless browser (those return the SPA shell or a Cloudflare 403, not the content).
