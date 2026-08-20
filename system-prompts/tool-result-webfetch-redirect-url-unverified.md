<!--
name: 'Tool Result: Redirect URL is server-supplied'
description: >-
  Reports the redirect target taken from the server's Location header and marks
  it as server-supplied and unverified.
ccVersion: 2.1.232
variables:
  - REDIRECT_URL
-->
Redirect URL (from the server's Location header — server-supplied, not verified): ${REDIRECT_URL}
