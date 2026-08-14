<!--
name: 'Tool Result: Artifact published (update instructions)'
description: >-
  Tells the model how to update a published artifact in place — republish the
  same path, or pass the URL from another conversation — and where the user
  browses their artifacts.
ccVersion: 2.1.231
variables:
  - ARTIFACTS_GALLERY_URL
-->


To update: republish the same file path in this conversation (keeps this URL), or pass the URL as `url` from any other conversation — publishing without `url` from a conversation that didn't publish this artifact creates a separate artifact rather than updating this one. Artifacts are private unless shared from the page's share menu; with Claude Code on the web, the user can browse theirs at ${ARTIFACTS_GALLERY_URL}.
