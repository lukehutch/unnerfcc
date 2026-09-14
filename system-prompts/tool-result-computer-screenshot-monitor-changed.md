<!--
name: 'Tool Result: Computer screenshot monitor changed'
description: >-
  Reports that the screenshot was taken on a different monitor than the previous
  one.
ccVersion: 2.1.270
variables:
  - CURRENT_MONITOR
  - PREVIOUS_MONITOR
  - EXTRA_NOTE
-->
This screenshot was taken on monitor "${CURRENT_MONITOR}", which is different from your previous screenshot (taken on "${PREVIOUS_MONITOR}").${EXTRA_NOTE}
