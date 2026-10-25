<!--
name: 'Tool Description: Web-fetch agent failure guidance'
description: >-
  Advises against retrying failed URLs or automated fetch refusals and warns
  that authenticated or private URLs will fail.
ccVersion: 2.1.310
-->
 When it reports that a page failed at its site, do not send that URL again, nor the site's other pages if the site refuses automated fetches: use another source. It WILL FAIL for authenticated or private URLs (Google Docs, Confluence, Jira, private GitHub repositories) — use `gh` or an authenticated MCP tool for those.
