<!--
name: 'Tool Description: Artifact Preview Section'
description: >-
  Describes the local preview capability of the Artifact tool for testing page
  files before publishing.
ccVersion: 2.1.251
-->
**Preview**: `action: "preview"` with a `file_path` renders that one page file locally the way publish wraps it, in light and dark themes at desktop and phone widths, and returns the screenshots with a mechanical checklist of layout and load problems, so you can see the page and fix what they show before publishing. It uploads nothing, needs no artifact URL, and runs without the artifact runtime, so capability calls on `window.claude` fail there — check those after publishing.
