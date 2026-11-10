<!--
name: 'Tool Result: Git safety use branch of its own'
description: Advises using an independent branch for the git command.
ccVersion: 2.1.321
variables:
  - GIT_COMMAND
-->
Use a branch of its own: git ${GIT_COMMAND} 
