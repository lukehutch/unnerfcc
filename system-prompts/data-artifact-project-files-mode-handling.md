<!--
name: 'Data: Artifact project files mode handling'
description: >-
  Directs publishing files under project/ when the marker is present and
  limiting store steps.
ccVersion: 2.1.272
variables:
  - MARKER_PROPERTY
-->
 is listed and holds ${MARKER_PROPERTY}, its content lives in files under `project/` as described before the instructions, not in the store documents: read and publish those files, and follow the instructions' store steps only when 
