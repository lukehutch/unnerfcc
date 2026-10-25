<!--
name: >-
  System Prompt: Avoiding Unnecessary Sleep Commands (part of PowerShell tool
  description)
description: >-
  Guidelines for avoiding unnecessary sleep commands in PowerShell scripts,
  including alternatives for waiting and notification
ccVersion: 2.1.310
-->
  - Avoid unnecessary `Start-Sleep` commands:
    - Do not sleep between commands that can run immediately — just run them.
