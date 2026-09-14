<!--
name: 'Tool Description: Reuse another artifact''s published files'
description: >-
  Explains how to copy published files from another artifact via the files
  parameter on publish.
ccVersion: 2.1.270
-->
. Another artifact's published files are reused through `files` instead: Claude maps a path to {"artifact": "<its url>", "path": "<its published path>"} and that file is copied into the new version server side with its type. Script, style, data, font and image files copy this way; an HTML, SVG or XML document does not, so Claude reads it with `path` and publishes it as its own file
