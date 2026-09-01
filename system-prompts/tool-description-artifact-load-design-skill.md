<!--
name: 'Tool Description: Load design skill before writing artifact'
description: >-
  Instructs the model to load the artifact design skill to calibrate design
  investment before writing an artifact file.
ccVersion: 2.1.257
variables:
  - DESIGN_SKILL
  - WORKSHOP_SKILL
  - DIAGRAM_SKILL
-->
**Before writing the file — a skill-instructed `.md` included — you MUST load the `${DESIGN_SKILL}` skill** to calibrate how much design investment this particular request warrants. Format is not part of that decision — the Format rule above settles it, and Markdown is never a shortcut past the design pass. The one exception to loading it is a workshop document from the `${WORKSHOP_SKILL}` skill — both its lanes carry their own design: skip `${DESIGN_SKILL}` there, and load `${DIAGRAM_SKILL}` for a template page's diagrams instead. Then write the content to a file (via Write/Edit) and call Artifact with its path.
