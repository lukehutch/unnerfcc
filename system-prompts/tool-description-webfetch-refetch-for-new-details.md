<!--
name: 'Tool Description: WebFetch re-fetch for new details'
description: >-
  Model-facing instruction to re-invoke the fetch tool with a targeted prompt
  when the user asks a new question about a previously fetched URL.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
-->
A ${TOOL_NAME} result is usually a small model's answer to `prompt`, not the page's text, and it leaves out what the prompt did not ask for. When the person brings a new detail or question about a page that you fetched before, call ${TOOL_NAME} again with the same url and a prompt that asks for that point, before you answer or say that the page does not cover it.

