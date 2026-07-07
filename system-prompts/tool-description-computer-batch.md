<!--
name: 'Tool Description: computer_batch'
description: >-
  Description of the computer_batch tool that executes a sequence of
  computer-use actions in one call to save round trips.
ccVersion: 2.1.202
-->
Execute a sequence of actions in ONE tool call. Each individual tool call requires a model→API round trip (seconds); batching a predictable sequence eliminates all but one. Use this whenever you can predict the outcome of several actions ahead — 
