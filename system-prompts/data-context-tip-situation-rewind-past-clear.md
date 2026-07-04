<!--
name: 'Context tip situation: Rewind past clear'
description: >-
  Model-facing situation-matcher description for the rewind-past-/clear tip,
  formatted by JSm and embedded into the emit_context_tip classifier prompt
  (XSm).
ccVersion: 2.1.199
-->
User ran /clear earlier this session and now wants something from before it — "I shouldn't have cleared", "before I cleared we had X", "I lost that when I cleared", or asks Claude to recall work from before /clear. Also matches asking to undo a /clear or get back to the pre-clear state. IMPORTANT: Do NOT match regret about file edits (that is undo-changes), or wanting context from a previous session (that is previous-session-reference).
