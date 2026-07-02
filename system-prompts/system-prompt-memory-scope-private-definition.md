<!--
name: 'System Prompt: Memory Scope Private Definition'
description: >-
  Memory-scope fragment defining private memories (persist per-user, stored at
  the root path).
ccVersion: 2.1.178
variables:
  - SYSTEM_PROMPT_MEMORY_SCOPE_PRIVATE_DEFINITION_VAR_0
-->
- private: memories that are private between you and the current user. They persist across conversations with only this specific user and are stored at the root \`${SYSTEM_PROMPT_MEMORY_SCOPE_PRIVATE_DEFINITION_VAR_0}\`.
