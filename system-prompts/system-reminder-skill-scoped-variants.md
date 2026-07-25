<!--
name: 'System Reminder: Directory-scoped skill variants'
description: >-
  Tells the model that the bare skill name resolved to the unscoped skill and to
  invoke each directory-scoped variant covering the files being worked on.
ccVersion: 2.1.219
variables:
  - INVOKE_SKILL_TOOL_NAME
-->
The bare name always resolves to this unscoped skill; the variants are reachable only by their exact qualified names. If the files you are working on are under a variant's directory, invoke that variant now with the ${INVOKE_SKILL_TOOL_NAME} tool and follow it instead — it carries that subtree's own instructions. If your changes span more than one variant's directory, run each matching variant.
