<!--
name: 'Tool Result: Git safety SSH ProxyCommand user hazard'
description: >-
  Warns that SSH ProxyCommand can execute arbitrary shell commands from
  unvalidated user names.
ccVersion: 2.1.318
-->
, which ssh pastes into a shell command if a ProxyCommand in an ssh config file uses it, so what it runs cannot be shown not to be git (to pass, use a user name with no leading -, no trailing \, no whitespace and none of ' " ` $ ; & | < > ( ) { } * ? [ ] ! # %, and no + in an sftp:// address)
