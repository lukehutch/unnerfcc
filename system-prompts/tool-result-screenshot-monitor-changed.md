<!--
name: 'Tool Result: Screenshot Monitor Changed'
description: >-
  Warns that the screenshot was taken on a different monitor from the previous
  screenshot.
ccVersion: 2.1.310
variables:
  - CURRENT_MONITOR
  - PREVIOUS_MONITOR
  - TRAILER
-->
This screenshot was taken on monitor "${CURRENT_MONITOR}", which is different from your previous screenshot (taken on "${PREVIOUS_MONITOR}").${TRAILER}
