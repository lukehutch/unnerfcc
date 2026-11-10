<!--
name: 'Tool Result: Connector file upload requires interactive terminal prompt'
description: >-
  Explains that uploading files to a connector requires an interactive approval
  prompt unavailable with -p or automated runners.
ccVersion: 2.1.321
-->
sending a file to a connector needs the user to allow it when Claude Code asks at its own prompt in a terminal, and this session cannot ask there (for example, it was started with -p or by another program). To send a file, the user would at least have to start Claude Code in a terminal themselves, without -p
