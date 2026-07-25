<!--
name: 'Tool Parameter: Artifact supporting files'
description: >-
  files parameter of the artifact publish tool — map or list form for publishing
  supporting files alongside the page, restricted to the working directory.
ccVersion: 2.1.219
-->
Supporting files to publish alongside the page. Map form {"published/path": "source/path" | {from, contentType}} publishes each source at the key (what the HTML references); list form publishes each file at its own spelling. Sources must lie under the working directory.
