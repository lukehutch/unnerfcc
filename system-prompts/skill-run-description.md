<!--
name: 'Skill: run description'
description: >-
  Skill description telling the model when to launch and drive the project's
  actual app to confirm a change works, preferring an existing project run skill
  over the built-in per-project-type fallbacks.
ccVersion: 2.1.219
-->
Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
