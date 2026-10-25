<!--
name: 'Tool Result: WebFetch recent failure prefix'
description: >-
  Prefix indicating a URL was not fetched because it failed recently in the
  session.
ccVersion: 2.1.310
variables:
  - URL
  - ELAPSED_SECONDS
-->
Not fetched: ${URL} failed ${ELAPSED_SECONDS}s ago in this session (
