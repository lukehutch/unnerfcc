<!--
name: 'Tool Parameter: Artifact files root directory'
description: >-
  Describes the root parameter resolving relative source file paths for artifact
  publishing.
ccVersion: 2.1.270
-->
Base directory that relative SOURCE paths resolve against (like a bundler root) — saves retyping a long build prefix. Never changes published paths. Relative to the working directory, or absolute within it or your scratchpad directory (so files fetched or built there publish without copying). Requires `files`
