<!--
name: 'Tool Result: Publish refused (read denied)'
description: >-
  Publish refusal telling the model the target page could not be checked for
  being a review page, to retry at most once, and otherwise to WebFetch the page
  or publish a fresh artifact from a new file path.
ccVersion: 2.1.231
-->
). This is usually a permanent policy deny — retry at most once (a concurrent republish can cause a one-off stale-version 403); if it repeats, WebFetch the page to check its state, or publish a fresh artifact (omit `url` and use a new `file_path`).
