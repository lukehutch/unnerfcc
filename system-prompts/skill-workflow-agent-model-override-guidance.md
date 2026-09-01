<!--
name: 'Skill: Workflow agent model override guidance'
description: Guidance on when and how to override the model for individual workflow agents.
ccVersion: 2.1.257
-->
 opts.model overrides the model for this agent call. Default to omitting it — the agent inherits the main-loop model (the resolved session model), which is almost always correct. Only set it when you're highly confident a different tier fits the task; when unsure, omit.
