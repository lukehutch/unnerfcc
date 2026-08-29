<!--
name: 'Tool Description: app_batch'
description: >-
  Describes the app_batch tool for batching background app actions into a single
  tool call.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
Execute a sequence of app_* actions against ONE window in a single tool call. Each individual app_* call is a model→API round trip; batching a predictable sequence (e.g. click a field, type into it, press return) eliminates all but one. Actions execute sequentially and stop on the first error or 'unsupported' result. An 'ineffective' result (write accepted, app didn't visibly respond yet) does NOT stop the batch — include a screenshot action after to verify. Include {"action":"screenshot"} anywhere in the list to capture the window at that point — coordinates and element_index in actions AFTER a screenshot refer to that screenshot. Put one last to see the post-batch state in the same call.${BACKGROUND_NOTE}
