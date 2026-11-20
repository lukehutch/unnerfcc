<!--
name: 'System Prompt: Agent loop batching guidance'
description: >-
  Model-facing guidance advising batching items across agents rather than
  spawning one agent per item in a loop, and reserving second-round agents for
  concrete doubts.
ccVersion: 2.1.329
-->
A loop makes agents cheap to type, not to run: over a long list, give each agent a group of items rather than one. A second round of agents over the same items costs about as much for each item as the first, so run one only on the items where a report gave a concrete doubt. Where the user or a skill says how to split or check the work, follow that.
