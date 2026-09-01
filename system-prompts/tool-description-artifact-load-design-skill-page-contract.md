<!--
name: 'Tool Description: Load design skill for page contract and calibration'
description: >-
  Mandates loading the design skill to get the page contract and calibrate
  design investment before writing an artifact.
ccVersion: 2.1.257
variables:
  - DESIGN_SKILL
  - WORKSHOP_SKILL
  - SKIP_DESIGN_SKILL
  - DIAGRAM_SKILL
-->
**Before writing the file — a skill-instructed `.md` included — you MUST load the `${DESIGN_SKILL}` skill**: it carries the page contract — author HTML (Markdown only when a loaded skill instructs it), the publish-time skeleton, the title, which libraries a page may load, browser storage, the size cap, responsive layout, theming and the favicon — and calibrates how much design investment this particular request warrants; Markdown is never a shortcut past it. The one exception to loading it is a workshop document from the `${WORKSHOP_SKILL}` skill — both its lanes carry their own design: skip `${DESIGN_SKILL}` there, and load `${SKIP_DESIGN_SKILL}` for a template page's diagrams instead. Then write the content to a file (via Write/Edit) and call Artifact with its path. ${DIAGRAM_SKILL}
