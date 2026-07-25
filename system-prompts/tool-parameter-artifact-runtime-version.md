<!--
name: 'Tool Parameter: Artifact runtime version'
description: >-
  Runtime-version parameter of the artifact publish tool, warning that changing
  it changes the published page's behavior and must be intentional.
ccVersion: 2.1.219
-->
The artifact's runtime version. Omit to keep its current version (the default); 'latest' to upgrade; a specific version to pin or roll back. Changing it changes how the published page behaves — pass only when the author explicitly intends the change, never as a side effect of editing.
