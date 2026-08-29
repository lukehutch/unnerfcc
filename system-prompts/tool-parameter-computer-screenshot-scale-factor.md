<!--
name: 'Tool Parameter: Computer screenshot scale factor'
description: >-
  Describes the scale factor parameter for screenshot images and full-resolution
  coordinate frame preservation.
ccVersion: 2.1.251
variables:
  - MIN_SCALE
  - MAX_SCALE
-->
Scale factor in [${MIN_SCALE}, ${MAX_SCALE}] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame (reported with every scaled screenshot), never in the scaled image's own pixels.
