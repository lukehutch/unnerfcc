<!--
name: 'Tool Result: Background command completion notification guidance'
description: >-
  Explains that nothing notifies the model when the background command finishes
  and advises reading the output file.
ccVersion: 2.1.310
-->
Nothing notifies you when the command finishes: read the output file that the result names to check on it. The file gets no line when the command ends, so if you need to know that it has, end the command with an `echo` of your own.
