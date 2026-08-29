<!--
name: 'Tool Result: Artifact Type Not Shared With Owner'
description: >-
  Explains that an artifact's type is not shared with the owner, so it remains
  pinned to its current release.
ccVersion: 2.1.251
variables:
  - RELEASE_VERSION
-->
 Its type isn't shared with this Artifact's owner, so this Artifact stays on release ${RELEASE_VERSION} and won't receive newer releases until it is — worth telling the user; nothing else to do here.
