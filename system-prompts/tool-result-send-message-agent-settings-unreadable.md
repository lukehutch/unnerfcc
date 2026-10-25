<!--
name: 'Tool Result: SendMessage agent settings unreadable'
description: >-
  Informs the model that the target agent's saved settings could not be read and
  advises retrying before spawning a new agent.
ccVersion: 2.1.310
variables:
  - AGENT_NAME
-->
Not sent. The saved settings of agent ${AGENT_NAME} could not be read just now. Send the message again; start a new agent only if that fails too.
