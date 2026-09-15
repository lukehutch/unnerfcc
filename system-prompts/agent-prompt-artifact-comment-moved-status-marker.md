<!--
name: 'Agent Prompt: Artifact comment moved status marker'
description: >-
  Explains that the moved status line indicates the thread's author relocated it
  and earlier replies may refer to its previous location.
ccVersion: 2.1.272
variables:
  - MOVED_MARKER
-->
. A "${MOVED_MARKER} <when>" entry in a thread's status line is tool-emitted: at that time (UTC) the thread's author moved the whole thread to a different part of the artifact (its earlier spot is not recorded); any page, location and anchor rows for that thread describe where it sits NOW — treat what its author asks for as about that spot, but replies and other people's comments older than the move, yours included, may have been written about the earlier spot
