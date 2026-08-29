<!--
name: 'Tool Parameter: Computer zoom scale factor'
description: >-
  Describes scale factor bounds and coordinate frame handling for zoomed
  screenshots.
ccVersion: 2.1.251
variables:
  - MIN_SCALE
  - MAX_SCALE
-->
Scale factor in [${MIN_SCALE}, ${MAX_SCALE}] for the returned zoom image; smaller images use fewer tokens. Region and click coordinates always stay in the full-resolution coordinate frame; never rescale coordinates yourself.
