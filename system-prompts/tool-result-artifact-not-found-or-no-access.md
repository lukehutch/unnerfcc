<!--
name: 'Tool Result: Artifact or document not found or no access'
description: >-
  Model-facing error stating an artifact, collection, or document does not exist
  or is inaccessible, and that repeated calls return the same answer until
  access changes.
ccVersion: 2.1.329
variables:
  - RESOURCE_IDENTIFIER
-->
${RESOURCE_IDENTIFIER}: no such artifact, collection, or document (or no access — the two are deliberately indistinguishable), and the same call gets the same answer until the link or the access changes
