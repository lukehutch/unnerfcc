<!--
name: 'Tool Result: Publish refused (permanent read failure)'
description: >-
  Tells the model the publish target check failed with a non-transient HTTP
  status, so retrying cannot succeed and the page should be fetched or a fresh
  artifact published.
ccVersion: 2.1.231
-->
 failure is not transient, so retrying this publish cannot succeed — WebFetch the page to check its state, or publish a fresh artifact (omit `url` and use a new `file_path`).
