<!--
name: 'Tool Parameter: Artifact title'
description: >-
  title field of the artifact publish tool — a fallback name used only when the
  HTML lacks a <title> tag, with content always coming from file_path.
ccVersion: 2.1.219
-->
Title for the artifact — the name shown in the browser tab and gallery. Prefer a <title> tag in the HTML itself; this parameter fills in only when the file lacks one and never overrides the tag. HTML publishes only — Markdown pages keep their filename identity. Content always comes from file_path — there is no inline content parameter.
