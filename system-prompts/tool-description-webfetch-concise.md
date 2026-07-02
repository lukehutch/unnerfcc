<!--
name: 'Tool Description: WebFetch (concise)'
description: >-
  Concise WebFetch tool description — fetches a URL, converts the page to
  markdown, and answers a prompt against it via a small fast model; notes
  auth-URL failure, HTTPS upgrade, cross-host redirect return, and the 15-minute
  per-URL cache
ccVersion: 2.1.177
variables:
  - IS_ARTIFACT_TOOL_ENABLED
-->
Fetches a URL, converts the page to markdown, and answers \`prompt\` against it using a small fast model.

- Fails on authenticated/private URLs — use an authenticated MCP tool or \`gh\` for those instead.${IS_ARTIFACT_TOOL_ENABLED?" Exception: claude.ai/code/artifact/{uuid} URLs ARE fetchable via your claude.ai login — use WebFetch, not curl (curl gets the SPA shell or a Cloudflare 403).":""}
- HTTP is upgraded to HTTPS. Cross-host redirects are returned to you rather than followed; call again with the redirect URL.
- Responses are cached for 15 minutes per URL.
