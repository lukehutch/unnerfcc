<!--
name: 'Data: Screenshot taken on a different monitor'
description: >-
  Note on a screenshot telling the model this capture came from a different
  monitor than the previous screenshot.
ccVersion: 2.1.219
variables:
  - CURRENT_MONITOR_NAME
  - PREVIOUS_MONITOR_NAME
  - SWITCH_DISPLAY_HINT
-->
This screenshot was taken on monitor "${CURRENT_MONITOR_NAME}", which is different from your previous screenshot (taken on "${PREVIOUS_MONITOR_NAME}").${SWITCH_DISPLAY_HINT}
