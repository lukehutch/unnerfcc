<!--
name: 'System Reminder: Artifact publish resumes auto-reply'
description: >-
  Explains how publishing an artifact again or the user's next typed message
  resumes auto-replies on supported hosts.
ccVersion: 2.1.251
variables:
  - ARTIFACT_NAME
  - RESUMED_TARGET
  - TARGET_SUFFIX
  - INPUT_PASSTHROUGH_CONDITION
  - ADDITIONAL_NOTE
-->
when the user asks you to publish ${ARTIFACT_NAME} again, that publish resumes ${RESUMED_TARGET}${TARGET_SUFFIX}, as does the user's next typed message — each only on hosts that pass typed input through as the user's${INPUT_PASSTHROUGH_CONDITION}; ${ADDITIONAL_NOTE}
