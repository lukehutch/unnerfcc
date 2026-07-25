<!--
name: 'Skill: /stuck daemon section'
description: >-
  Daemon section of the /stuck slash command, reporting that no daemon lock or
  status file was found and where any daemon log lives.
ccVersion: 2.1.219
variables:
  - DAEMON_LOG_PATH
-->
## Daemon

No daemon lock or status file found — the background daemon does not appear to be running. If the issue involves background sessions or `claude agents`, the daemon log (if any) is at `${DAEMON_LOG_PATH}`.
