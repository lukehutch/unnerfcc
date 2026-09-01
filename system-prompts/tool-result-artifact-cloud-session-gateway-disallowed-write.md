<!--
name: 'Tool Result: Cloud session gateway disallowed artifact write'
description: >-
  Notifies that the gateway disallowed the artifact write call because cloud
  network access is turned off.
ccVersion: 2.1.257
variables:
  - ACTION_OR_URL
-->
${ACTION_OR_URL}: this cloud session's network access is turned off (or could not be confirmed), and the gateway did not accept this call as a write it allows — do not retry it here
