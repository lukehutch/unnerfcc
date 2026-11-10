<!--
name: 'System Reminder: Approved plan read doc instruction'
description: >-
  Directs the model to read the approved project Doc before planning or taking
  any further steps.
ccVersion: 2.1.321
variables:
  - PLAN_HEADER
  - READ_TOOL_NAME
-->
${PLAN_HEADER}

Before your todo list or any other step, read the Doc: first call ${READ_TOOL_NAME} with only `ref` {"object":"project","id":"
