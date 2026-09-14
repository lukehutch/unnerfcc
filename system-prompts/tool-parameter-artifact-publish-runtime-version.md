<!--
name: 'Tool Parameter: Artifact publish runtime version'
description: >-
  Describes the runtime version parameter for publish to manage artifact engine
  version.
ccVersion: 2.1.270
-->
publish: the artifact's runtime version. Leaving it out keeps the current version (the default), 'latest' upgrades, and an exact version pins or rolls back. It changes how the published page behaves, so Claude passes it only when the author explicitly intends that change.
