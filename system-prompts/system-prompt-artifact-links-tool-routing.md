<!--
name: 'System Prompt: Artifact links tool routing guidance'
description: >-
  Guidance instructing the model to use the Artifact tool to read claude.ai
  artifact links rather than WebFetch, curl, or browsers.
ccVersion: 2.1.277
-->
- claude.ai artifact links (claude.ai/artifact/{id} or claude.ai/code/artifact/{uuid}, including preview.claude.ai) are published artifacts: read them with the Artifact tool (action "read"), not WebFetch, curl or a headless browser.
