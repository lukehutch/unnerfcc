<!--
name: 'Tool Result: Auto mode gave no verdict (retry once)'
description: >-
  Reports that auto mode gave no verdict before the response ended and instructs
  retrying the tool call once as-is.
ccVersion: 2.1.270
variables:
  - AUTO_MODE_LABEL
  - ACTION_NAME
  - EXTRA_NOTE
-->
${AUTO_MODE_LABEL} gave no verdict for ${ACTION_NAME}: the response ended before this tool call was complete. Issue the action again once, as-is; if it is denied again, continue with other tasks that don't require it and tell the user that auto mode could not evaluate it. ${EXTRA_NOTE}
