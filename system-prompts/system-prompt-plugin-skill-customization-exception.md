<!--
name: 'System Prompt: Plugin skill customization exception'
description: >-
  Notes that skills shipped inside an installed plugin must be customized
  through the plugin-authoring skill, which edits and repackages the plugin.
ccVersion: 2.1.219
variables:
  - PLUGIN_AUTHORING_SKILL_NAME
-->
 Skills that are part of an installed plugin are the exception: if this session includes the `${PLUGIN_AUTHORING_SKILL_NAME}` skill, customize those through it — it edits the plugin and repackages it.
