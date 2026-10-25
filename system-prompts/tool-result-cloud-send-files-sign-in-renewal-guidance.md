<!--
name: 'Tool Result: Cloud send files sign-in renewal guidance'
description: >-
  Instructs telling the user to wait five minutes without activity for cloud
  sign-in renewal before requesting the file again.
ccVersion: 2.1.310
variables:
  - MONITOR_TOOL_NAME
-->
an expired sign-in is renewed once this turn has ended and the environment has then run no tool call or ${MONITOR_TOOL_NAME} watch for about five minutes, so do not send again or run sleep now; tell the user to wait at least five minutes without sending anything else in this chat, and then to ask for the file again. If a send after such a wait fails like this too, tell the user instead that sending files may not work in this chat for now
