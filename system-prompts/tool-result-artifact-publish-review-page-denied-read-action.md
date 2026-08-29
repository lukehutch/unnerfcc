<!--
name: 'Tool Result: Publish refused review page check denied (read action suggested)'
description: 'Publish refusal suggesting action: read or publishing a fresh artifact.'
ccVersion: 2.1.251
variables:
  - DENIAL_REASON
-->
publish refused: could not verify the target page is not a review page (read denied: ${DENIAL_REASON}). Read the page (action: "read") to check its state, or publish a fresh artifact (omit `url` and use a new `file_path`).
