<!--
name: 'Skill: Claude API security comparison or ask language'
description: >-
  Directs handling Managed Agents security guide comparisons without language
  detection or asking the user for language.
ccVersion: 2.1.310
variables:
  - SECURITY_GUIDE_INSTRUCTION
-->
If the request is to compare a Managed Agents deployment with the published security guide, none is needed: ${SECURITY_GUIDE_INSTRUCTION}. Otherwise, ask the user which language they are using (see Language Detection above)
