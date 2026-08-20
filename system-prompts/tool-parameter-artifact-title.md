<!--
name: 'Tool Parameter: Artifact title'
description: >-
  title field of the artifact publish tool — a short, distinctive fallback name
  used only when the HTML lacks a <title> tag in its first 8KB, with content
  always coming from file_path.
ccVersion: 2.1.231
-->
Title for the artifact — the name shown in the browser tab and gallery. A short, distinctive noun-phrase name — not a generic label, a summary, or a name with an appended explainer. Prefer a <title> tag at the top of the HTML itself; this parameter fills in only when the file lacks one in the first 8KB of the file, and never overrides the tag. HTML publishes only — Markdown pages keep their filename identity. Content always comes from file_path — there is no inline content parameter.
