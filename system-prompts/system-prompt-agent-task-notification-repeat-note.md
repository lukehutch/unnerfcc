<!--
name: 'System Prompt: Agent task-notification repeat note'
description: >-
  Notes that an agent fires a task-notification each time it stops with no live
  children, so the same task-id may notify more than once after the user resumes
  it.
ccVersion: 2.1.270
variables:
  - NOTE_OPEN_TAG
  - NOTE_CLOSE_TAG
  - AGENT_TOOLS_NOTE
  - AGENT_MODEL_NOTE
-->

<${NOTE_OPEN_TAG}>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</${NOTE_OPEN_TAG}>${NOTE_CLOSE_TAG}${AGENT_TOOLS_NOTE}${AGENT_MODEL_NOTE}
