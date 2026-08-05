<!--
name: 'Tool Result: Artifact permission check failed in plan mode'
description: >-
  Tells the model the artifact action is denied because its permission check
  failed before plan mode could verify a consent surface, and to retry only once
  that failure clears.
ccVersion: 2.1.222
-->
The permission check for this artifact action failed before plan mode could verify a consent surface, so the action is denied. Retry after the underlying failure clears, or keep planning in the plan file and raise open choices with the user in chat.
