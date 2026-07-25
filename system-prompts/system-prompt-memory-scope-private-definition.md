<!--
name: 'System Prompt: Memory Scope Private Definition'
description: >-
  Memory-scope fragment defining private memories (persist per-user, stored at
  the root path).
ccVersion: 2.1.219
variables:
  - MEMORY_ROOT_PATH
-->
- private: memories that are private between you and the current user. They persist across conversations with only this specific user and are stored at the root `${MEMORY_ROOT_PATH}`.
