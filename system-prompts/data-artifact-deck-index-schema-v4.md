<!--
name: 'Data: Artifact deck index schema v5'
description: >-
  Specifies the JSON structure and keys for a version 5 slide deck index file
  including shared CSS format metadata.
ccVersion: 2.1.329
-->
`"v": 5`, `"lists": "css"`, `"format": {"v": 1, "shared": ["project/deck.css"]}` (a deck that already has slides keeps its `v` and gains neither `lists` nor `format`; an index that gains `format` is published in one call with `project/deck.css`), `title`, `order`: the slide ids in deck order, `sections`: the outline (an id → `{"description", "start": <slide id>}`), and `faces`: one entry per typeface, keyed by family-id (`{"family"}` plus a Google Fonts `href` or an uploaded `src`)
