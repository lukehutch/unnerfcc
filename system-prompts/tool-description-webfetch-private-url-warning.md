<!--
name: 'Tool Description: WebFetch private URL warning'
description: >-
  WebFetch usage warning — the tool fails on authenticated or private URLs;
  check whether the URL points to an authenticated service and prefer a
  specialized MCP tool, with the claude.ai artifact-URL exception
ccVersion: 2.1.177
variables:
  - IS_ARTIFACT_TOOL_ENABLED
  - WEBFETCH_TOOL_DESCRIPTION_BLOCK
-->
IMPORTANT: WebFetch WILL FAIL for authenticated or private URLs. Before using this tool, check if the URL points to an authenticated service (e.g. Google Docs, Confluence, Jira, GitHub). If so, look for a specialized MCP tool that provides authenticated access.
${IS_ARTIFACT_TOOL_ENABLED?`- Exception: claude.ai/code/artifact/{uuid} URLs (including preview.claude.ai) ARE fetchable — WebFetch uses your claude.ai login. Use WebFetch for these, not curl or a headless browser (those return the SPA shell or a Cloudflare 403, not the content).
`:""}${WEBFETCH_TOOL_DESCRIPTION_BLOCK}
