<!--
name: Task Tool run_in_background Parameter
description: >-
  Zod .describe() for the agent/Task tool's run_in_background inputSchema param;
  ships in the tool definition sent to the model.
ccVersion: 2.1.231
-->
Agents run in the background by default; you will be notified when one completes. Set to false only when your very next action depends on this agent's result and nothing else could usefully happen while it runs — otherwise leave it in the background so the user can hand you other work.
