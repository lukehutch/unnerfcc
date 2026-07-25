<!--
name: 'Tool Description: Agent background execution'
description: >-
  Explains that spawned agents run in the background with automatic completion
  notifications, and when to run one in the foreground.
ccVersion: 2.1.219
-->

- Agents run in the background by default. When an agent runs in the background, you will be automatically notified when it completes — do NOT sleep, poll, or proactively check on its progress. Continue with other work or respond to the user instead.
- **Foreground vs background**: Pass `run_in_background: false` to run an agent in the foreground when you need its results before you can proceed — e.g., research agents whose findings inform your next steps. Otherwise let it run in the background (the default) so you can keep working in parallel.
