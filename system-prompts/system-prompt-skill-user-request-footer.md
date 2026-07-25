<!--
name: 'System Prompt: User request footer'
description: >-
  Trailing block of a command prompt that quotes the user's request and tells
  the model to start from their intent and follow the workflow above.
ccVersion: 2.1.219
variables:
  - USER_REQUEST
-->

## User Request

The user said: "${USER_REQUEST}"

Start by understanding their intent and working through the appropriate workflow above.
