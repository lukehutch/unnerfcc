<!--
name: 'Tool Parameter Validation: Named field prohibits unsafe markup'
description: >-
  Validation rule forbidding markdown images, script-scheme links, or HTML
  resource tags in the specified field.
ccVersion: 2.1.318
variables:
  - FIELD_NAME
-->
${FIELD_NAME} must not contain markdown images, script-scheme links or HTML resource tags
