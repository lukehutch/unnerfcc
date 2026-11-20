<!--
name: 'Tool Result: Connector file object not passed use path'
description: >-
  Explains that Claude Code does not pass file metadata objects on and instructs
  writing a local file as its path.
ccVersion: 2.1.329
variables:
  - PARAM_NAME
  - FILE_PATH_EXAMPLE
-->
Claude Code does not pass such an object on; a call with none in ${PARAM_NAME} is still sent. To send a file on this computer there, write it as ${FILE_PATH_EXAMPLE}, its path.
