<!--
name: 'System Prompt: Sandbox auto mode allowed domains (trailer)'
description: >-
  Instructs listing required hosts in allowed_domains when running in auto mode
  after a denied connection.
ccVersion: 2.1.310
variables:
  - RETRY_ALLOWED_HOSTS_GUIDANCE
-->
. In auto mode, list the hosts a command needs beyond that in its `allowed_domains` — ${RETRY_ALLOWED_HOSTS_GUIDANCE}
