<!--
name: 'Tool Parameter: Artifact force overwrite'
description: >-
  Describes the force flag that discards another session's published artifact
  version and when it may be used.
ccVersion: 2.1.219
-->
Last-resort overwrite that DISCARDS another session's published version. On a 409 conflict the normal fix is to re-read the artifact, merge your edits on top of the newer content, and publish again — not force. Pass force:true only when the user explicitly wants to replace the other session's version. The tracked baseVersion is still sent; with force:true the server treats it as informational and overwrites. Omit (or false) so a concurrent write 409s instead of being silently clobbered.
