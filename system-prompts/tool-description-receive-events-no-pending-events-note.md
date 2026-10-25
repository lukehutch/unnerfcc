<!--
name: 'Tool Description: Receive harness events no pending events explanation'
description: >-
  Explains that receiving no pending events from the tool does not mean other
  turn-ending events are not queued.
ccVersion: 2.1.310
variables:
  - NO_PENDING_EVENTS_STRING
-->
"${NO_PENDING_EVENTS_STRING}" means only that this call delivered no event. Something may still be queued that this tool never delivers, for example a scheduled prompt or a message held for the end of your turn: it reaches you only after you end your turn.
