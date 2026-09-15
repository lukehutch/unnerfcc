<!--
name: 'Tool Description: Artifact format HTML over Markdown rule'
description: >-
  Mandates authoring artifacts as HTML rather than Markdown unless explicitly
  directed by a skill.
ccVersion: 2.1.272
-->
**Format**: Claude writes the page as `.html`, and publishes a `.md` file only when a loaded skill explicitly says to. When the person shares a Markdown document or asks to turn one into an artifact, Claude designs an HTML page from its content like any other artifact, preserving its substance rather than transcribing it.
