<!--
name: 'Tool Result: Auto mode no verdict retry once'
description: >-
  Informs the model that auto mode gave no verdict, instructing it to retry the
  action once as-is.
ccVersion: 2.1.263
variables:
  - AUTO_MODE_NAME
  - ACTION_NAME
  - REASON_SUFFIX
-->
${AUTO_MODE_NAME} gave no verdict for ${ACTION_NAME}: the request that produced this action did not ask for one. Issue the action again once, as-is; if it is denied again, continue with other tasks that don't require it and tell the user that auto mode could not evaluate it. ${REASON_SUFFIX}
