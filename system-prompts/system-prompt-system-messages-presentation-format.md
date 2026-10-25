<!--
name: 'System Prompt: System messages presentation format'
description: >-
  Explains how system messages and system reminders appear between turns and
  inside tool results.
ccVersion: 2.1.310
-->
Mostly they show up as their own short system messages slotted between the turns of the conversation; a few (the context note at the very start, and anything tucked inside a tool result) show up wrapped in <system-reminder> tags instead. Same source either way.
