<!--
name: 'Tool Description: Computer computer_batch'
description: >-
  Describes the computer-use computer_batch tool for executing a sequence of
  computer actions in one call
ccVersion: 2.1.219
-->
Execute a sequence of actions in ONE tool call. Each individual tool call requires a model→API round trip (seconds); batching a predictable sequence eliminates all but one. Use this whenever you can predict the outcome of several actions ahead — e.g. click a field, type into it, press Return. Actions execute sequentially and stop on the first error. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. The frontmost check runs before EACH action inside the batch — if an action opens a non-allowed app, the next action's gate fires and the batch stops there. Mid-batch screenshot actions are allowed for inspection but coordinates in subsequent clicks always refer to the PRE-BATCH full-screen screenshot.
