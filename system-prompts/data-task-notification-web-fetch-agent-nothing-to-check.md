<!--
name: 'Task Notification: Web-fetch agents have nothing to check'
description: >-
  Tells the model the named web-fetch agents left nothing on disk to inspect, so
  they must be launched again if their reports are still needed.
ccVersion: 2.1.232
variables:
  - WEB_FETCH_AGENT_CLAUSE
  - AGENT_PRONOUN
-->
 ${WEB_FETCH_AGENT_CLAUSE} nothing to check — launch ${AGENT_PRONOUN} again if still needed.
