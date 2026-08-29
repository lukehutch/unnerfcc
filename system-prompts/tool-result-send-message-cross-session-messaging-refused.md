<!--
name: 'Tool Result: Target session does not accept cross-session messages'
description: >-
  Tells the model the message was not sent because the target session refuses
  cross-session messages, and to reach that machine another way or ask its user
  to enable the feature.
ccVersion: 2.1.251
variables:
  - TARGET_NAME
  - TARGET_REF_SUFFIX
-->
Not sent: '${TARGET_NAME}' ${TARGET_REF_SUFFIX} — its Claude would never see the message. That session is set not to accept cross-session messages (the feature is off on its platform, or a setting or policy there refuses them); reach that machine another way, or ask its user to enable it (listings refresh within a few minutes — re-run ListAgents after they do).
