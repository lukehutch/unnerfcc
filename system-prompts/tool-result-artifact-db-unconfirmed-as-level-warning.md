<!--
name: 'Tool Result: Artifact DB Unconfirmed as_level Warning'
description: >-
  Warns that the requested as_level was not confirmed by the server and may have
  executed at default level.
ccVersion: 2.1.270
variables:
  - REQUESTED_LEVEL
-->

[as_level '${REQUESTED_LEVEL}' was requested but this server did not confirm applying it — treat the result as possibly made at your own level]
