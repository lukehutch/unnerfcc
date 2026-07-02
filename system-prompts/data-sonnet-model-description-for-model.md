<!--
name: 'Data: Sonnet model description for model'
description: >-
  descriptionForModel for the custom Sonnet model (with optional 1M context
  note).
ccVersion: 2.1.178
variables:
  - DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_0
  - DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_1
  - DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_2
-->
${DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_0.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION??`Custom Sonnet model${DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_1?" with 1M context":""}`} (${DATA_SONNET_MODEL_DESCRIPTION_FOR_MODEL_VAR_2})
