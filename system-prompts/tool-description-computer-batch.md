<!--
name: 'Tool Description: Computer batch'
description: >-
  Describes executing a sequence of actions in one tool call with
  computer_batch.
ccVersion: 2.1.270
variables:
  - BATCH_EXECUTION_NOTE
-->
Execute a sequence of actions in ONE tool call. Each individual tool call requires a model→API round trip (seconds); batching a predictable sequence eliminates all but one. Use this whenever you can predict the outcome of several actions ahead — e.g. click a field, type into it, press Return. Actions execute sequentially and stop on the first error. ${BATCH_EXECUTION_NOTE} The frontmost check runs before EACH action inside the batch — if an action opens a non-allowed app, the next action's gate fires and the batch stops there. Screenshot and zoom actions are allowed and their images are returned interleaved with the per-action outputs. Coordinates you write in THIS batch — clicks AND zoom regions — always refer to the full-screen screenshot taken BEFORE this call, never to a zoom and never to a mid-batch screenshot. After the batch returns, the most recent full screenshot it produced becomes the new coordinate reference for your next call.
