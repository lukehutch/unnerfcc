<!--
name: 'Tool Result: Publish refused review page check denied (retry once)'
description: >-
  Publish refusal explaining policy deny, allowing one retry before falling back
  to read or fresh publish.
ccVersion: 2.1.251
variables:
  - DENIAL_REASON
-->
publish refused: could not verify the target page is not a review page (read denied: ${DENIAL_REASON}). This is usually a permanent policy deny — retry at most once (a concurrent republish can cause a one-off stale-version 403); if it repeats, read the page (action: "read") to check its state, or publish a fresh artifact (omit `url` and use a new `file_path`).
