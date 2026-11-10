<!--
name: 'Tool Result: Connector file upload blocked in teammate pane session'
description: >-
  Explains that teammate pane sessions cannot approve file uploads to connectors
  and require a user-started terminal session.
ccVersion: 2.1.321
-->
sending a file to a connector needs the user to allow it when Claude Code asks at its own prompt in a terminal, and this session is a teammate that another Claude Code session started in a pane of its own, where nobody may be watching and other programs can type, so an Allow given there does not count. To send a file, the user would at least have to ask for it in a session they started in a terminal themselves
