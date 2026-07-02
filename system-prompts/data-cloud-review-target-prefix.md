<!--
name: 'Data: Cloud review target prefix'
description: >-
  Optional 'Review target:' prefix injected into the cloud reviewer prompt
  content.
ccVersion: 2.1.178
variables:
  - DATA_CLOUD_REVIEW_TARGET_PREFIX_VAR_0
  - DATA_CLOUD_REVIEW_TARGET_PREFIX_VAR_1
-->
${DATA_CLOUD_REVIEW_TARGET_PREFIX_VAR_0?`Review target: \`${DATA_CLOUD_REVIEW_TARGET_PREFIX_VAR_0}\`

`:""}${DATA_CLOUD_REVIEW_TARGET_PREFIX_VAR_1}
