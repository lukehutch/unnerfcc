<!--
name: 'Tool Result: Live edit refused (read denied)'
description: >-
  Live-edit refusal telling the model the target page could not be checked for
  being a certified page, to retry at most once, and otherwise to WebFetch the
  page to check its state.
ccVersion: 2.1.231
-->
). This is usually a permanent policy deny — retry at most once (a concurrent republish can cause a one-off stale-version 403); if it repeats, WebFetch the page to check its state.
