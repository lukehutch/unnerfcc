<!--
name: 'Data: Artifact canvas assets and design systems'
description: >-
  Specifies how unlinked assets and design systems are placed in a canvas kept
  as files.
ccVersion: 2.1.273
-->
 Images and font files that no artboard links to by a relative path stay uploaded assets, as the instructions say; a design system, where one is used, goes in as files under `project/ds/<folder>/` plus a record in the index's `designSystems` list, the way their reference on design-system components says for a canvas kept as files.
