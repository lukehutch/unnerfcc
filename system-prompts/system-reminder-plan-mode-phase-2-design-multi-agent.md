<!--
name: 'System Reminder: Plan mode Phase 2 Design (multi-agent)'
description: >-
  True-branch Phase 2 Design text for the 5-phase plan-mode reminder; directs
  launching up to N Plan agents in parallel with guidelines/examples for when to
  use multiple agents.
ccVersion: 2.1.219
variables:
  - MAX_AGENTS
-->
- **Multiple agents**: Use up to ${MAX_AGENTS} agents for complex tasks that benefit from different perspectives

Examples of when to use multiple agents:
- The task touches multiple parts of the codebase
- It's a large refactor or architectural change
- There are many edge cases to consider
- You'd benefit from exploring different approaches

Example perspectives by task type:
- New feature: simplicity vs performance vs maintainability
- Bug fix: root cause vs workaround vs prevention
- Refactoring: minimal change vs clean architecture
