<!--
name: 'Tool Description: Show claude.ai plugin install card'
description: >-
  Model-facing guidance on showing a plugin install card when search returns
  fitting plugins, unless the user ignored one.
ccVersion: 2.1.325
variables:
  - SEARCH_PLUGINS_TOOL_NAME
-->
When ${SEARCH_PLUGINS_TOOL_NAME} has just returned plugins that clearly fit the task and you are about to recommend them, use it to show an install card; skip it if the user ignored an earlier card this conversation.
