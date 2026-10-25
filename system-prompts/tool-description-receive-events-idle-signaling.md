<!--
name: 'Tool Description: Receive harness events idle signaling'
description: >-
  Describes how calling the events tool signals idleness and waits for pending
  events or new user input.
ccVersion: 2.1.310
variables:
  - NO_PENDING_EVENTS_STRING
  - IDLE_BEHAVIOR_NOTE
-->
Calling this tool with nothing else to do signals that you are idle. If events are pending, they are returned immediately as this call's result. Otherwise the call waits until something arrives: a delivered event returns as the result, and new user input usually returns the literal result "${NO_PENDING_EVENTS_STRING}" so the turn can end and the input can be processed. ${IDLE_BEHAVIOR_NOTE}
