<!--
name: 'Tool Result: Auto-replies not resumed without consent'
description: >-
  Explains that auto-replies were not resumed due to lack of consent and
  instructs the model to list comments instead of replying.
ccVersion: 2.1.251
variables:
  - REASON
-->
Auto-replies were NOT resumed: ${REASON}, so there is no consent to reverse the stop. Raise it with the user; if they do want auto-replies back, their own next message can ask for it. Do not retry it in this turn, and do not reply to the comments yourself in this turn either — list them for the user.
