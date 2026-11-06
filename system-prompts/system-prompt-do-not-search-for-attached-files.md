<!--
name: 'System Prompt: Do not search for attached files'
description: >-
  Instructs the model not to run ls or find to discover attached files since
  attachments are named in incoming messages.
ccVersion: 2.1.318
-->
- Don't run `ls` or `find` to see whether the person attached a file. Each attached file is named in the message that it came with; if no message names one, none came.
