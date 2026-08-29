<!--
name: 'Tool Parameter: Artifact force overwrite conflict handling'
description: >-
  Explains how to handle conflicts by merging rather than forcing, and when
  force:true is permissible.
ccVersion: 2.1.251
-->
 On a conflict the fix is to merge your changes onto the newer content (handed to you in the rejection, or re-read) and publish again — not force. Pass force:true only when the user has explicitly said to discard that specific version; never to get past a conflict on your own judgment. The tracked baseVersion is still sent; with force:true the server treats it as informational and overwrites, unless it refuses force over a version saved from inside the page. Omit (or false) so a concurrent write conflicts instead of being silently clobbered.
