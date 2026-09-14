<!--
name: 'Tool Parameter: Chrome screenshot scale factor'
description: >-
  Describes scale factor parameter for screenshot and zoom actions in the Chrome
  tool.
ccVersion: 2.1.270
variables:
  - MIN_SCALE
  - MAX_SCALE
-->
For `screenshot` and `zoom` only. Scale factor in [${MIN_SCALE}, ${MAX_SCALE}] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame (reported with every scaled screenshot), never in the scaled image's own pixels. Requires a Claude in Chrome extension version that supports scale; older extensions return the full-size image.
