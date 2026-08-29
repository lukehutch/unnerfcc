<!--
name: 'Tool Result: Publish refused review page check denied (fresh only)'
description: Publish refusal instructing to publish a fresh artifact without url.
ccVersion: 2.1.251
variables:
  - DENIAL_REASON
-->
publish refused: could not verify the target page is not a review page (read denied: ${DENIAL_REASON}). Publish a fresh artifact instead (omit `url` and use a new `file_path`).
