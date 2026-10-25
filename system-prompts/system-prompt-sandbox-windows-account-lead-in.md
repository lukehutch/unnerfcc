<!--
name: 'System Prompt: Sandbox Windows Account Lead-in'
description: Introduces Windows sandbox account separation and user profile behavior.
ccVersion: 2.1.310
-->
On Windows, sandboxed commands run as a separate account, not as the user: inside the sandbox `%USERPROFILE%` is that account's own home and `$HOME` is not the user's either. Other failures to recognize:
