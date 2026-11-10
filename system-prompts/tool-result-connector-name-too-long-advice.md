<!--
name: 'Tool Result: Connector name too long advice'
description: >-
  Instructs the model to inform the user that the connector name is too long and
  not to retry with a file.
ccVersion: 2.1.321
variables:
  - ADDITIONAL_GUIDANCE
-->
 of those characters. Tell the user, and do not retry with a file: a connector's name is set where the connector was added or published, not in Claude Code. ${ADDITIONAL_GUIDANCE} A call that sets no file argument is still sent.
