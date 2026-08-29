<!--
name: 'Tool Result: Watch stopped and re-arm refused'
description: >-
  Explains why re-arming a stopped watch was refused and tells the model to list
  comments rather than replying.
ccVersion: 2.1.251
variables:
  - REASON
-->
Not watching: watching this artifact was stopped earlier in this session, and ${REASON}. Raise it with the user; if they want it watched again, their own next message can ask for it. Do not reply to its comments yourself in this turn either — list them for the user.
