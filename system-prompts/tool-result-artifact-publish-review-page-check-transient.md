<!--
name: 'Tool Result: Publish refused review page check transient failure'
description: Publish refusal explaining a transient read error and suggesting a retry.
ccVersion: 2.1.251
variables:
  - ERROR_MESSAGE
-->
publish refused: could not verify the target page is not a review page (transient read failure: ${ERROR_MESSAGE}). Retry the publish; if it persists, read the page (action: "read") to confirm it is reachable.
