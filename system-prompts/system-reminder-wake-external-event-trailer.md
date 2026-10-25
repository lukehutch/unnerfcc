<!--
name: 'System Reminder: Wake External Event Trailer'
description: >-
  Closing XML structure for an external event wake notification wrapping event
  payload details.
ccVersion: 2.1.310
variables:
  - EVENT_ATTRIBUTES
  - EVENT_PREFIX
  - EVENT_PAYLOAD
-->
"${EVENT_ATTRIBUTES}>
${EVENT_PREFIX}    ${EVENT_PAYLOAD}
  </event>
</wake>
