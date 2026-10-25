<!--
name: 'Tool Result: Remote machine approval session timeout applied'
description: >-
  Explains that the session timeout applied because the remote machine announced
  no wait limit and suggests updating Claude Code.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
  - TIMEOUT
  - STATUS_CLAUSE
-->
${PREFIX} ${MACHINE_NAME} announced no wait of its own for approvals, so this session's ${TIMEOUT} applied. ${STATUS_CLAUSE}, that you will ask again when they say so, and that making sure Claude Code on ${MACHINE_NAME} is up to date (or the Claude desktop app, if that is what runs it there) may give them longer to answer.
