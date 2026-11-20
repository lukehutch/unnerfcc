<!--
name: 'Tool Result: Agent limits unapplicable, cannot resume'
description: >-
  Informs the model that an agent cannot be resumed because the current process
  cannot apply the limits it previously ran under.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} ran under limits this process can't apply, so nothing can run on what it ran under. Start a new agent if the work is still needed.
