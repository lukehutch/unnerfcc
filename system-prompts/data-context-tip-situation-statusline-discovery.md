<!--
name: 'Data: Context Tip Situation — Statusline Discovery'
description: >-
  Situation catalog entry describing the user asking about ambient session
  state, used by the context-tip selector model to decide when to suggest
  /statusline
ccVersion: 2.1.191
-->
User asks about ambient session state that would normally be visible at a glance — current model, context window usage, total cost so far, working directory, git branch — and the answer appears in the assistant's prose. Also matches when the user repeatedly asks the same status-style question across turns ("which model is this again?", "how much have we spent?", "what branch am I on?").
