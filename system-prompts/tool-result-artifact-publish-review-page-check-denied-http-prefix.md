<!--
name: 'Tool Result: Publish refused review page check denied HTTP prefix'
description: Publish refusal prefix for HTTP status errors during review page check.
ccVersion: 2.1.251
variables:
  - DENIAL_REASON
-->
publish refused: could not verify the target page is not a review page (read denied: ${DENIAL_REASON}). An HTTP 
