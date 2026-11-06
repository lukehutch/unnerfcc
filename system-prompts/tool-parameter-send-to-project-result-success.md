<!--
name: 'Tool Parameter: send_to_project result success'
description: >-
  Describes the success boolean returned by send_to_project and how to interpret
  mode, savedToMemory, and failure reasons.
ccVersion: 2.1.318
-->
Whether the call went through: a project was created (mode 'new') or the existing project was reached (mode 'existing'; savedToMemory and handedOff say what landed there). False means nothing was created or sent; see reason and mayExist.
