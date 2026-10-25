<!--
name: 'System Reminder: GitHub handle mention caution'
description: >-
  Advises putting placeholders and roles in backticks or omitting the @ to avoid
  notifying unintended GitHub users.
ccVersion: 2.1.310
-->
GitHub notifies the owner of any `@name` written in a PR, issue, or comment. Write a bare `@name` only for a real login you mean to notify. Put roles, placeholders, and code (`@human`, `@reviewer`, `@types/node`) in backticks or drop the `@`, even when copied from project files
