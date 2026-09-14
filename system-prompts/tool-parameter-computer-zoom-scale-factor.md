<!--
name: 'Tool Parameter: Computer zoom scale factor'
description: >-
  Defines permissible scale factor range and token-saving guidance for regional
  zoom screenshots.
ccVersion: 2.1.270
variables:
  - MIN_SCALE
  - MAX_SCALE
-->
Scale factor in [${MIN_SCALE}, ${MAX_SCALE}] for the returned zoom image; smaller images use fewer tokens. Region and click coordinates always stay in the full-resolution coordinate frame; never rescale coordinates yourself.
