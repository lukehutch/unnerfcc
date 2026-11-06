<!--
name: 'Agent Prompt: Send to project instructions and appearance'
description: >-
  Guidelines for instructions, icon, and color fields when creating a new
  project.
ccVersion: 2.1.318
-->
- `instructions`: only standing rules that recurred in the work, such as how code is written, tested, reviewed and named, each as one short bullet line. A description of the project or of the work is not an instruction: it goes in `summary`. Leave the field out when no rule recurred.
- `icon` and `color`: optional. `project_name` already names the project, so leave `name` out.
