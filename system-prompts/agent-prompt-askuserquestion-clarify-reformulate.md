<!--
name: 'Agent Prompt: Clarify and reformulate questions'
description: >-
  prompt instructing the model to take the user's clarification into account and
  reformulate the questions
ccVersion: 2.1.178
variables:
  - AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_0
  - AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_1
  - AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_2
  - AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_3
-->
The user wants to clarify these questions.
    This means they may have additional information, context or questions for you.
    Take their response into account and then reformulate the questions if appropriate.
    Start by asking them what they would like to clarify.

    Questions asked:
${AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_0(AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_1,AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_2,AGENT_PROMPT_ASKUSERQUESTION_CLARIFY_REFORMULATE_VAR_3)}
