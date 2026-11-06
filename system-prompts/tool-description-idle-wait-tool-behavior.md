<!--
name: 'Tool Description: Idle wait tool behavior'
description: >-
  Describes the behavior of an idle wait tool that signals readiness and blocks
  until events or user input arrive.
ccVersion: 2.1.318
variables:
  - EMPTY_RESULT_STRING
  - EXTRA_NOTE
-->
Calling this tool with nothing else to do signals that you are idle. If events are pending, they are returned immediately as this call's result. Otherwise the call waits until something arrives: a script ending, another event, or a message from the user. Events come back as the result. When the user sends a message, usually the call returns (with the literal result "${EMPTY_RESULT_STRING}" if no event came with it) and the message follows the result in the same turn, as user text; nothing ends your turn for you. The wait also ends shortly before the prompt cache would expire, with a line saying what is still running; if something is queued for the end of your turn, it ends by then with "${EMPTY_RESULT_STRING}" instead. ${EXTRA_NOTE}
