<!--
name: 'Tool Parameter: Artifact source root'
description: >-
  Base directory that relative source paths resolve against when publishing
  artifact files, without changing published paths.
ccVersion: 2.1.219
-->
Base directory that relative SOURCE paths resolve against (like a bundler root) — saves retyping a long build prefix. Never changes published paths. Absolute, or relative to the working directory; must lie within it. Requires `files`.
