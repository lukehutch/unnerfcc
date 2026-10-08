<!--
name: 'Tool Result: Claude Test registry lacks Playwright version suffix'
description: >-
  Suffix instructing the model to set allowFallback only if the user explicitly
  requested that version.
ccVersion: 2.1.293
variables:
  - NEWEST_VERSION
-->
.x is ${NEWEST_VERSION}. Set allowFallback only when the person has asked for ${NEWEST_VERSION}. Do not install another way, and do not change the registry unless the person asks you to.
