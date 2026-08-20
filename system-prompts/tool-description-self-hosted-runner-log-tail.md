<!--
name: 'Tool Description: Self-hosted runner log tail'
description: >-
  Describes the typed doctor tool that reads the tail of the runner's log file
  with the shared secret redaction applied before the content reaches model
  context.
ccVersion: 2.1.231
-->
Read the last N bytes of the runner's --log-file with the shared secret redaction (key=value secrets, sk-ant/Bearer/Basic, URL userinfo, JWTs, and VCS/service PATs — see redact() in src/utils/secretRedaction.ts for the current rule set) applied before the content reaches model context.
