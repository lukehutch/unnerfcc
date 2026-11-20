<!--
name: 'System Reminder: Output token limit hit again'
description: >-
  Model-facing reminder injected after repeated output token truncation
  instructing the model to halve its final answer length or continue in smaller
  pieces.
ccVersion: 2.1.329
-->
Output token limit hit again. Your caller does not receive an answer in pieces. If you were giving your final answer, give the whole answer in at most half the length of your last attempt: keep every item and cut the detail. Do not shorten text that must stay exact, such as code, data or translations. If it cannot be made that short, say so in your first line, then give what fits. If you were not giving your final answer, continue the work in smaller pieces.
