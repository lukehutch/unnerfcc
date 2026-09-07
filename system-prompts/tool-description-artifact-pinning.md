<!--
name: 'Tool Description: Artifact pinning guidance'
description: >-
  Explains how and when to pin or unpin artifacts in the user's claude.ai
  sidebar.
ccVersion: 2.1.263
-->
**Pinning**: `action: "pin"` with an artifact's `url` adds it to the user's sidebar on claude.ai and `action: "unpin"` removes it — do either when the user asks, and after publishing something they will keep reopening (a dashboard, a tracker, a board) offer to pin it and pin only on a yes; pass `pin: true` on a publish only when they asked for the pin beforehand. Never pin one-off pages or unpin something you did not pin unless asked; pins are private to the user and change nothing about who can see the artifact.
