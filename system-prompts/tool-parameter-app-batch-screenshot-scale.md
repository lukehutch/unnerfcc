<!--
name: 'Tool Parameter: app_batch screenshot scale'
description: scale parameter description for screenshot actions within app_batch.
ccVersion: 2.1.251
-->
For screenshot only. Scale factor in [0.1, 1] for the returned image; 1 (default) uses the full image token budget, 0.5 returns an image at half the width and height (~quarter of the tokens). Coordinates are ALWAYS in the full-resolution coordinate frame, never in the scaled image's own pixels.
