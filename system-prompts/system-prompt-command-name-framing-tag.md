<!--
name: Slash-Command Name Framing Tag
description: >-
  Model-facing framing tag wrapping a slash-command invocation into a user-role
  message sent to the model ("<command-name>...</command-name>"); present
  whenever a slash command is expanded into the conversation.
ccVersion: 2.1.191
variables:
  - SYSTEM_PROMPT_COMMAND_NAME_FRAMING_TAG_VAR_0
-->
<command-name>/ultrareview${SYSTEM_PROMPT_COMMAND_NAME_FRAMING_TAG_VAR_0?" "+SYSTEM_PROMPT_COMMAND_NAME_FRAMING_TAG_VAR_0:""}</command-name>
