<!--
name: 'Tool Description: ListAgents'
description: >-
  Model-facing description of the ListAgents tool listing addressable
  subagents/local/remote sessions and how to send messages to them.
ccVersion: 2.1.199
variables:
  - TOOL_DESCRIPTION_LISTAGENTS_VAR_0
-->
Lists agents you can ${TOOL_DESCRIPTION_LISTAGENTS_VAR_0} to — in-process subagents you spawned, other local Claude sessions on this machine, and (when Remote Control is connected) remote bridge sessions, which you can only reply to. Names are the address: send with \`${TOOL_DESCRIPTION_LISTAGENTS_VAR_0}({to: "<name>", message: "..."})\`, copying the name exactly as a row prints it. Append a row's \` [ref]\` only when the bare name is not enough — two rows share it, or an error asks you to disambiguate.
