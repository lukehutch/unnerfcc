<!--
name: 'Tool Parameter: App Screenshot Scale'
description: >-
  Explains the image scaling factor parameter and coordinate frame invariants
  for screenshots.
ccVersion: 2.1.310
-->
For screenshot only. Scale factor in [0.1, 1] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame, never in the scaled image's own pixels.
