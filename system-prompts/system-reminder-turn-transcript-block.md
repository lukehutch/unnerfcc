<!--
name: 'System Reminder: Turn transcript block'
description: Formats transcript turns with timestamp and speaker markers.
ccVersion: 2.1.318
variables:
  - LEAD_IN
  - TIMESTAMP
  - CONTENT
-->
${LEAD_IN}Each turn starts with [${TIMESTAMP}] and who spoke.

${CONTENT}
