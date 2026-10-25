<!--
name: 'Tool Result: Remote Machine Sender Confirmation Failed'
description: >-
  Informs that the remote machine could not verify this session as the sender
  and instructs continuing without it.
ccVersion: 2.1.310
variables:
  - ERROR_PREFIX
  - MACHINE_NAME
-->
${ERROR_PREFIX} Retrying, reconnecting ${MACHINE_NAME} or changing a setting on it is unlikely to fix this, and a new session is unlikely to help: ${MACHINE_NAME} got no confirmation it could read from Anthropic's service that this session is the sender. Tell the user that, ask them to report it to Anthropic, and continue without ${MACHINE_NAME}.
