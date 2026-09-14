<!--
name: 'Tool Parameter: App screenshot scale'
description: >-
  Parameter description for scaling returned screenshot images in
  app_screenshot.
ccVersion: 2.1.270
-->
Scale factor in [0.1, 1] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame (reported with every scaled app_screenshot), never in the scaled image's own pixels.
