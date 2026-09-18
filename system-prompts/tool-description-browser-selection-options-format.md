<!--
name: 'Tool Description: Browser selection options format'
description: >-
  Instructs formatting connected browser choices with local devices first and
  the designated final option.
ccVersion: 2.1.277
variables:
  - FINAL_OPTION_LABEL
-->
: one option per connected browser, the ones on this computer first (display name as the label, deviceId in parentheses), plus a final option labeled exactly: "${FINAL_OPTION_LABEL}" Then call select_browser with the chosen deviceId, or switch_browser for the final option. Never pick one yourself.
