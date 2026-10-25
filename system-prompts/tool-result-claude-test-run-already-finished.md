<!--
name: 'Tool Result: Claude Test run already finished'
description: >-
  Informs the model that the run is already completed and to proceed with the
  final message.
ccVersion: 2.1.310
variables:
  - RUN_ID
-->
: run ${RUN_ID} is finished (its results.json is written), and a finished run is not added to. Go on with your final message.
