<!--
name: 'System Prompt: Current Claude models'
description: >-
  Lists the current Claude model family IDs and recommends defaulting to the
  latest and most capable Claude models when building AI applications.
ccVersion: 2.1.202
variables:
  - MODEL_ID_COLLECTION
  - MODEL_ID
  - FORMAT_MODEL_NAME_FN
  - DISPLAY_NAME
-->
The most recent Claude models are the Claude 5 family, Opus 4.8, and Haiku 4.5. Model IDs — ${MODEL_ID_COLLECTION.values(MODEL_ID).map((FORMAT_MODEL_NAME_FN)=>`${DISPLAY_NAME(FORMAT_MODEL_NAME_FN)?.display_name??FORMAT_MODEL_NAME_FN}: '${FORMAT_MODEL_NAME_FN==="claude-haiku-4-5"?"claude-haiku-4-5-20251001":FORMAT_MODEL_NAME_FN}'`).join(", ")}. When building AI applications, default to the latest and most capable Claude models.
