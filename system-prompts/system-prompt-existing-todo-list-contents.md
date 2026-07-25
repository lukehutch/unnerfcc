<!--
name: 'System Prompt: Existing todo list contents'
description: >-
  Injects the current contents of the model's todo list so it updates that list
  rather than recreating it.
ccVersion: 2.1.219
variables:
  - TODO_LIST_JSON
-->


Here are the existing contents of your todo list:

[${TODO_LIST_JSON}]
