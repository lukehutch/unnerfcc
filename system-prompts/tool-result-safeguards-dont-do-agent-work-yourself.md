<!--
name: 'Tool Result: Safeguards do not perform agent work yourself'
description: >-
  Warns the model not to perform the stopped agent's work directly since
  safeguards apply to the conversation too.
ccVersion: 2.1.318
variables:
  - STOP_NOTICE
  - REMEDIATION_ADVICE
  - DEFENSE_ACCESS_NOTE
-->
${STOP_NOTICE} ${REMEDIATION_ADVICE} Don't do the agent's work yourself: safeguards cover this conversation too.${DEFENSE_ACCESS_NOTE}
