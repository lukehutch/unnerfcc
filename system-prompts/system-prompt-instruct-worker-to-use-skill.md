<!--
name: 'System Prompt: Instruct Worker To Use Skill'
description: >-
  Skill-description fragment telling Claude how to instruct a worker to invoke a
  skill via its Agent prompt.
ccVersion: 2.1.178
variables:
  - SYSTEM_PROMPT_INSTRUCT_WORKER_TO_USE_SKILL_VAR_0
-->

Instruct a worker to use this skill by including "Use the /${SYSTEM_PROMPT_INSTRUCT_WORKER_TO_USE_SKILL_VAR_0.name} skill" in your Agent prompt. The worker has access to the Skill tool and will receive the skill's content and permissions when it invokes it.
