<!--
name: 'Data: Artifact deck index schema v4'
description: Specifies the JSON structure and keys for a version 4 slide deck index file.
ccVersion: 2.1.273
-->
`"v": 4`, `title`, `order`: the slide ids in deck order, `sections`: the outline (an id → `{"description", "start": <slide id>}`), and `faces`: one entry per typeface, keyed by family-id (`{"family"}` plus a Google Fonts `href` or an uploaded `src`)
