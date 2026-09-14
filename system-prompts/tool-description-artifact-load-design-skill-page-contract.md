<!--
name: 'Tool Description: Load design skill for page contract and calibration'
description: >-
  Mandates loading the design skill to get the page contract and calibrate
  design investment before writing an artifact.
ccVersion: 2.1.270
variables:
  - DESIGN_SKILL
  - WORKSHOP_SKILL
  - DIAGRAM_SKILL
-->
**Before writing the file, Claude must load the `${DESIGN_SKILL}` skill**, including for a `.md` file that a skill told Claude to write. The skill holds the page contract, from the authoring format (HTML, or Markdown only when a loaded skill asks for it) to the title, libraries, storage, size limit, layout, theming and favicon. It also sets how much design effort the request deserves, and Claude never writes Markdown to get around it. The one exception is a workshop document from the `${WORKSHOP_SKILL}` skill, which carries its own design: there Claude skips `${DESIGN_SKILL}` and loads `${DIAGRAM_SKILL}` for a template page's diagrams. Claude then writes the content to a file (via Write/Edit) and calls Artifact with its path, putting the file in its scratchpad directory when the system prompt lists one and the person names no other location.
