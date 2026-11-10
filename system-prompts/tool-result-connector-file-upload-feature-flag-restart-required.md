<!--
name: 'Tool Result: Connector file upload feature flag restart required'
description: >-
  Informs that connector file uploads are disabled while a feature flag is
  active and requires restarting Claude Code.
ccVersion: 2.1.321
variables:
  - SETTING_OR_FLAG_NAME
  - SETTING_OR_FLAG_PARAM
-->
Claude Code does not send a file to a connector once ${SETTING_OR_FLAG_NAME} has been on since Claude Code was started, as it has been here. To send a file, the user would at least have to quit Claude Code and start it again with ${SETTING_OR_FLAG_PARAM} off
