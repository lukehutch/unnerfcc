<!--
name: 'Tool Description: Agent fork type behavior'
description: >-
  Explains that subagent_type fork inherits the full conversation and runs on
  the same model, while other types start fresh.
ccVersion: 2.1.310
-->
 A type of "fork" forks yourself, allowing the fork to inherit your full conversation and context, and ensuring that it runs on the same model that you are running on (a `model` override is ignored for forks). For other types of subagents, they start fresh without your context window.
