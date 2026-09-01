<!--
name: 'Tool Description: Artifact watches session-local rules and limitations'
description: >-
  Details session-local watch visibility in /tasks and rules against claiming
  unconfirmed watches.
ccVersion: 2.1.257
variables:
  - WATCH_ACTION_INSTRUCTION
  - AUTO_REPLY_NOTE
-->
 ${WATCH_ACTION_INSTRUCTION} Watches are session-local, and the user can see and stop them in /tasks. Do not claim you are watching an artifact unless a watch result or a publish result's "already connected" line says so — its "arming" line is not yet a watch. Only an interactive or SDK main-loop session holds a watch (not a subagent, teammate, background, or print session).${AUTO_REPLY_NOTE}
