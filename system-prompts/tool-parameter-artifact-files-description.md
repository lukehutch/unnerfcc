<!--
name: 'Tool Parameter: Artifact files parameter description'
description: >-
  Documents the map and list structures for publishing supporting files
  alongside an artifact HTML page.
ccVersion: 2.1.277
variables:
  - MAX_SOURCE_ARTIFACT_VERSIONS
-->
Supporting files to publish alongside the page. Map form {"published/path": "source/path" | {from, contentType} | {artifact, path, ver?} | null} publishes each source at the key (what the HTML references) — an {artifact, path} source copies that Artifact's published file server side (an Artifact you can open; its type comes with it; not an HTML, SVG or XML document; at most ${MAX_SOURCE_ARTIFACT_VERSIONS} source Artifact versions per publish); when updating an existing artifact, files left out of the map are kept and null removes that path. List form publishes each file at its own spelling. Local sources must lie under the working directory or your scratchpad directory (as your system prompt names it).
