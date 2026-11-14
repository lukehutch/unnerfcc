<!--
name: 'Tool Description: List claude.ai plugins usage guidance'
description: >-
  Model-facing guidance on when to call the tool to list claude.ai plugins
  versus recommending uninstalled plugins.
ccVersion: 2.1.325
variables:
  - INSTALL_CARD_TOOL_NAME
  - SEARCH_PLUGINS_TOOL_NAME
-->
When the user asks which plugins they have on claude.ai, or you are about to say what was installed after a ${INSTALL_CARD_TOOL_NAME} card, use it; it omits plugins installed locally with /plugin; for plugins they lack, use ${SEARCH_PLUGINS_TOOL_NAME}.
