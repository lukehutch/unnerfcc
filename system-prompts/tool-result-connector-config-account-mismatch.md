<!--
name: 'Tool Result: Session and config Claude account mismatch'
description: >-
  Informs the model that no file was sent because the session and config file
  disagree on the signed-in account and advises waiting or running /login.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
No file was sent: this session and Claude Code's configuration file do not agree on which Claude account is signed in. That can last a moment while somebody signs in or out in another window. Tell the user: the call can be made again once that is done, or after they run /login. ${CALL_STATUS_NOTE}
