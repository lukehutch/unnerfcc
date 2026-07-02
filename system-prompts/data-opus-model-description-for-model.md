<!--
name: 'Data: Opus model description for model'
description: descriptionForModel for the custom Opus model (with optional 1M context note).
ccVersion: 2.1.178
variables:
  - DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_0
  - DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_1
  - DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_2
-->
${DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_0.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION??`Custom Opus model${DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_1?" with 1M context":""}`} (${DATA_OPUS_MODEL_DESCRIPTION_FOR_MODEL_VAR_2})
