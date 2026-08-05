<!--
name: 'Tool Result: Skill blocked by disable-model-invocation'
description: >-
  Tells the model the named skill cannot be run through the skill tool because
  disable-model-invocation is set on it.
ccVersion: 2.1.222
variables:
  - SKILL_NAME
  - SKILL_TOOL_NAME
-->
Skill ${SKILL_NAME} cannot be used with ${SKILL_TOOL_NAME} tool due to disable-model-invocation. 
