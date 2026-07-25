<!--
name: 'Skill: claude-api provider skip rules'
description: >-
  Skip conditions for the claude-api skill — another provider named in the query
  or found by grep overrides all of its triggers.
ccVersion: 2.1.219
-->
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
