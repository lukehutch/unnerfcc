<!--
name: 'Tool Result: Connector file failed post-approval check'
description: >-
  Informs the model that a file was not sent because it or session permissions
  changed and failed checks after approval.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_DETAIL
  - FOLLOW_UP_GUIDANCE
-->
${FILE_NAME} was not sent: it no longer passed Claude Code's checks. The file, or what this session may send, may have changed since the approval prompt.${EXTRA_DETAIL} ${FOLLOW_UP_GUIDANCE}
