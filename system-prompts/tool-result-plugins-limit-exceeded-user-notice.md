<!--
name: 'Tool Result: Account exceeds session plugin listing limit'
description: >-
  Model-facing notice for the user explaining that too many claude.ai plugins
  are enabled to list in one session.
ccVersion: 2.1.325
variables:
  - MAX_PLUGINS_COUNT
-->
For the user, not for you to act on: this account has more than ${MAX_PLUGINS_COUNT} plugins turned on, which is more than a session can list, so plugins may be missing from this session. Turning enough off at claude.ai/customize/plugins/yours to get to ${MAX_PLUGINS_COUNT} or fewer fixes it for new sessions. Calling this tool again does not.
