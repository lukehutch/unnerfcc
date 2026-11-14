<!--
name: 'Skill: claude-api skip rules'
description: >-
  Defines the non-Anthropic provider conditions under which the claude-api skill
  trigger should be skipped.
ccVersion: 2.1.325
-->
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
