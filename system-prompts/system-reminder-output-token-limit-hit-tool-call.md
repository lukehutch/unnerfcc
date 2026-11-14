<!--
name: 'System Reminder: Output token limit hit inside tool call'
description: >-
  Notifies the model that its response was cut off inside a tool call due to the
  output token limit and instructs retrying in smaller calls.
ccVersion: 2.1.325
-->
Your response was cut off because it exceeded the output token limit. The cut fell inside a tool call, so that call did not run and nothing of it was kept. Make the call again in a shorter response: split long content across several smaller tool calls. For a long file, write the first part and then append the rest in later calls.
