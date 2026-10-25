<!--
name: 'System Reminder: Resume agent guidance after container restart'
description: >-
  Instructs resuming stopped agents via SendMessage rather than relaunching
  after a container restart.
ccVersion: 2.1.310
variables:
  - SEND_MESSAGE_TOOL
-->

If you still need an agent's result, resume it rather than launch it again: send a message to its agent id with the ${SEND_MESSAGE_TOOL} tool. It continues from its saved transcript, which still holds its task, so it is enough to ask it to continue from where it stopped. You get its result when it is done. If the resume fails, launch the agent again.
