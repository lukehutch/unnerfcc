<!--
name: 'Tool Description: Artifact supporting files'
description: >-
  Explains how to publish a multi-file artifact by mapping published paths to
  source files.
ccVersion: 2.1.270
-->
**Supporting files**: a multi-file artifact (separate stylesheets, scripts, data or images) publishes its other files through `files`, which maps each published path to a source file. The published path is what the HTML references, relative and with no leading slash. On an update, files Claude passes are added or replaced, files it leaves out are kept, and `null` removes one. Limits: 
