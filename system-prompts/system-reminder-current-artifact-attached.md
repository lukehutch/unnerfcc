<!--
name: 'System Reminder: Current artifact attached'
description: >-
  Tells the model the user attached an artifact as the session's current
  artifact of interest and that it must re-read it before editing or
  republishing.
ccVersion: 2.1.329
variables:
  - REMINDER_PREFIX
  - CONTEXT_PREFIX
  - ARTIFACT_ID
  - TOOL_GUIDANCE_SUFFIX
-->
${REMINDER_PREFIX}${CONTEXT_PREFIX}The user attached the artifact ${ARTIFACT_ID} to this session as the current artifact of interest. Re-read it before editing or republishing.${TOOL_GUIDANCE_SUFFIX}
