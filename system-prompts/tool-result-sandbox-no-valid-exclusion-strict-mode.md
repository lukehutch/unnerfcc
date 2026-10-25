<!--
name: 'Tool Result: No valid sandbox exclusion under strict mode'
description: >-
  Explains that project-level settings cannot exempt commands from the sandbox
  under strict mode.
ccVersion: 2.1.310
-->
no sandbox.excludedCommands entry in user settings, managed settings or a --settings file exempts this command; an entry in a project's .claude/settings.json or settings.local.json does not count under strict mode
