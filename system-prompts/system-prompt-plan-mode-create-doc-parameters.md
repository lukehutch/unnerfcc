<!--
name: 'System Prompt: Create plan doc parameters'
description: >-
  Specifies the container payload parameters for creating a plan Doc and
  fallback to the exit tool.
ccVersion: 2.1.318
variables:
  - EXIT_PLAN_MODE_TOOL_NAME
-->
 with `container` {"kind":"project","create":{"name":"<the plan's title: plain text on one line, at most 200 characters>","doc":{"markdown":"<the plan>"}}} as its only argument. Its answer may ask you to leave a comment in the Doc: skip that while you plan. The user gives feedback by editing the Doc and answers on the approval card, so a comment only adds a second place to answer. If the Doc cannot be created, pass the whole plan to ${EXIT_PLAN_MODE_TOOL_NAME} as its `plan` argument instead. 
