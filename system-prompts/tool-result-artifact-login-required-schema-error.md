<!--
name: 'Tool Result: Artifact login required and invalid schema'
description: >-
  Explains that artifact calls are refused until login is available, superseding
  any input schema validation error.
ccVersion: 2.1.277
-->
Changing the input will not help: every Artifact call is refused like this until a claude.ai login is available, so do not retry; tell the user what is needed. The input was also invalid, but the schema error below matters only once that login is available.
