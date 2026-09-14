<!--
name: 'Tool Description: WebFetch redirect and cache notes'
description: >-
  WebFetch usage notes stating that HTTP is upgraded to HTTPS, cross-host
  redirects are returned rather than followed, and responses are cached per URL.
ccVersion: 2.1.270
-->

- Fails on localhost and other hostnames without a dot; for a local server, use curl via Bash.
- HTTP is upgraded to HTTPS. Cross-host redirects are returned to you rather than followed; call again with the redirect URL.
- Responses are cached for 
