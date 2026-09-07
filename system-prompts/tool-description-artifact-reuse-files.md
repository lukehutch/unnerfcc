<!--
name: 'Tool Description: Artifact reuse files'
description: >-
  Explains how to reuse published files of another artifact through the files
  map in a publish call.
ccVersion: 2.1.263
-->
 Published FILES of another artifact are reused through a publish instead: in the `files` map, give a path the source `{"artifact": "<its url>", "path": "<its published path>"}` and that file is copied into your version server side with its type — script, style, data, font and image files copy this way; an HTML, SVG or XML document does not (read it with read_file and publish it as your own file).
