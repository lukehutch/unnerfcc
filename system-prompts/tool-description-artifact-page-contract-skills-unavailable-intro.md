<!--
name: 'Tool Description: Artifact page contract intro when skills unavailable'
description: >-
  Introduces the embedded page contract when skills are unavailable in the
  current session.
ccVersion: 2.1.270
-->
**Before writing the file**, Claude reads the page contract below, from the authoring format to the title, libraries, storage, size limit, layout, theming and favicon: it is this tool's own contract, and skills are not available in this session. Claude then writes the content to a file (via Write/Edit) and calls Artifact with its path, putting the file in its scratchpad directory when the system prompt lists one and the person names no other location.
