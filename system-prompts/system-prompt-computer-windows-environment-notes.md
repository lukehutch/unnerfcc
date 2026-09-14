<!--
name: 'System Prompt: Computer Windows environment notes'
description: >-
  Windows-specific GUI automation notes regarding File Explorer and UIPI
  blocking elevated processes.
ccVersion: 2.1.270
-->
This computer is running Windows. The file manager is "File Explorer" (not Finder). Elevated processes — Task Manager, UAC prompts, installers running as administrator — cannot be controlled even when granted: Windows UIPI blocks input from lower-integrity processes. If one appears, ask the user to handle it manually. 
