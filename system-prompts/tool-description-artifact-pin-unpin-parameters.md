<!--
name: 'Tool Description: Artifact pin and unpin parameters'
description: >-
  Documents the url parameter and usage rules for pinning and unpinning
  artifacts.
ccVersion: 2.1.263
-->
- **pin** / **unpin**: `url` — adds the artifact to the user's pinned list in their claude.ai sidebar, or removes it; private to the user, reversible, and no change to who can see it. Pin or unpin when the user asks; after publishing something they will keep reopening (a dashboard, a tracker, a board) offer to pin it and pin only on a yes — or pass `pin: true` on that publish when they asked for the pin beforehand. Never pin one-off pages or unpin something you did not pin unless asked.
