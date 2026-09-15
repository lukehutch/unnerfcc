<!--
name: 'Tool Description: Load design skill before writing artifact'
description: >-
  Instructs the model to load the artifact design skill to calibrate design
  investment before writing an artifact file.
ccVersion: 2.1.272
variables:
  - DESIGN_SKILL
-->
**Before writing the file, Claude must load the `${DESIGN_SKILL}` skill**, including for a `.md` file that a skill told Claude to write. The skill sets how much design effort the request deserves; the Format rule above settles the format, and Claude never writes Markdown to get around the design pass.
