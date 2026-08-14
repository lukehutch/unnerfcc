<!--
name: 'Tool Parameter: Artifact session context'
description: >-
  session_context field of the artifact publish tool — the handoff context
  stored with the published version, required on the first publish and replacing
  the stored text whenever it is provided.
ccVersion: 2.1.231
variables:
  - SESSION_CONTEXT_CHECKLIST
-->
Context stored with the published version so the next session can pick up the work. Required the first time an artifact is published; on later publishes omit it unless things changed — providing it replaces the stored text. Cover: ${SESSION_CONTEXT_CHECKLIST}.
