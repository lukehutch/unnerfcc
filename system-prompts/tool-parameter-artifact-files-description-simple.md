<!--
name: 'Tool Parameter: Artifact files parameter description (simple)'
description: >-
  Documents the map and list structures for publishing supporting files without
  cross-artifact references.
ccVersion: 2.1.270
-->
Supporting files to publish alongside the page. Map form {"published/path": "source/path" | {from, contentType} | null} publishes each source at the key (what the HTML references); when updating an existing artifact, files left out of the map are kept and null removes that path. List form publishes each file at its own spelling. Sources must lie under the working directory or your scratchpad directory (as your system prompt names it).
