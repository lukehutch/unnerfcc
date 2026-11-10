<!--
name: 'Tool Result: Connector file upload remote control runner blocked'
description: >-
  Explains that file uploads to connectors are disabled in sessions initiated by
  cloud runners, servers, or Remote Control.
ccVersion: 2.1.321
-->
Claude Code does not send a file to a connector in a session that a cloud service, a runner, a server or Remote Control started for the user, as this one was. To send a file, the user would at least have to start Claude Code themselves in a terminal, without -p
