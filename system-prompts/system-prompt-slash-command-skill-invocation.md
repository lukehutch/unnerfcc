<!--
name: 'System Prompt: User-invocable slash command skill invocation'
description: >-
  Instructs the model to invoke user slash commands with tools.Skill from a
  script only for skills listed in the user-invocable skills section.
ccVersion: 2.1.318
-->
When the user types `/<skill-name>`, invoke it with `tools.Skill` from a script. Only use skills listed in the user-invocable skills section — don't guess.
