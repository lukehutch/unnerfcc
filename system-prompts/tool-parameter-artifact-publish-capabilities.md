<!--
name: 'Tool Parameter: Artifact publish capabilities'
description: Describes the capabilities configuration object passed on publish.
ccVersion: 2.1.270
variables:
  - CAPABILITIES_SKILL_NAME
-->
publish: the runtime capabilities this page declares, as {name: config}. Claude loads the `${CAPABILITIES_SKILL_NAME}` skill before passing it. On a redeploy Claude omits the field to keep what the page has, and {} clears it.
