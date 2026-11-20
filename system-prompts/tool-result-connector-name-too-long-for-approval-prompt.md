<!--
name: 'Tool Result: Connector name too long for approval prompt'
description: >-
  Explains that no file was sent because the connector name exceeds the maximum
  length allowed in the approval prompt.
ccVersion: 2.1.329
-->
No file was sent: this connector's name is too long for Claude Code to show whole in its approval prompt, and Claude Code asks the user to approve sending files only to a connector it can name in full. The prompt writes the name in quotes: the name the connector was given, then a number such as " (2)" where two connectors' names would otherwise clash. It shows at most 
