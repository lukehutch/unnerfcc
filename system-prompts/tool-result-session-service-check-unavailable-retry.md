<!--
name: 'Tool Result: Session service verification unavailable'
description: >-
  Model-facing error advising waiting about 45 seconds before retrying a remote
  call when Anthropic's service check failed, and stopping after three refusals.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} could not check this session with Anthropic's service just now, so nothing was done for this request. That can pass: do other work, or wait, for about 45 seconds, then send the call again. If you have reason to think that it already ran or is still running, check that first. If it is refused this way three times, tell the user and continue without ${MACHINE_NAME}.
