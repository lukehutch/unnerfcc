<!--
name: 'Tool Description: SendMessage addressing and relay guidance'
description: >-
  Guides agent addressing by name or agentId and advises against quoting relayed
  messages.
ccVersion: 2.1.310
variables:
  - ADDITIONAL_GUIDANCE
-->
 Refer to agents by name — names keep working after an agent completes (a send resumes it from its transcript). Use the raw `agentId` (format `a...-...`) from its spawn result only when the agent has no name, or when a newer agent took the name (latest wins). When relaying, don't quote the original — it's already rendered to the user.${ADDITIONAL_GUIDANCE}
