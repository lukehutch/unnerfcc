<!--
name: 'Data: Attached machine git literal pathspecs command'
description: >-
  Git command template with GIT_LITERAL_PATHSPECS=0 for highlighting sensitive
  file paths.
ccVersion: 2.1.277
variables:
  - GIT_COMMAND
  - PATHSPECS
-->
env GIT_LITERAL_PATHSPECS=0 ${GIT_COMMAND} -- ${PATHSPECS}
