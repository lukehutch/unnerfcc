<!--
name: 'Skill: Design sync global export usage'
description: >-
  Template snippet showing how components from a design system package are
  exposed on the window global.
ccVersion: 2.1.251
variables:
  - PACKAGE_NAME
  - GLOBAL_NAMESPACE
-->
 from ${PACKAGE_NAME}. Use via `window.${GLOBAL_NAMESPACE}.
