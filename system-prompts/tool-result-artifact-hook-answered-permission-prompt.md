<!--
name: 'Tool Result: PermissionRequest hook answered prompt instead of user'
description: >-
  Explains that an automated hook answered the permission prompt instead of the
  user and instructs not to retry.
ccVersion: 2.1.277
-->
a PermissionRequest hook answered the permission prompt in the user's place; only the user's own approval allows this read — nothing was returned; do not retry it here, and tell the user their hook answered for them (to approve it themselves they would narrow the hook so it no longer answers this prompt)
