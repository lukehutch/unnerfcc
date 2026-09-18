<!--
name: 'Tool Result: Load skill first before publishing artifact'
description: >-
  Instructs the model to load the required skill for the page contract before
  attempting to publish.
ccVersion: 2.1.277
variables:
  - SKILL_NAME
-->
Load the `${SKILL_NAME}` skill first — it carries the page contract (title, libraries, size, theming, icon) — then publish again.
