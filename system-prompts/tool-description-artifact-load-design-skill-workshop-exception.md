<!--
name: 'Tool Description: Workshop skill exception to artifact design skill loading'
description: >-
  Notes that workshop documents carry their own design and do not require
  loading the artifact design skill.
ccVersion: 2.1.272
variables:
  - WORKSHOP_SKILL
  - DESIGN_SKILL
  - DIAGRAM_SKILL
-->
 The one exception is a workshop document from the `${WORKSHOP_SKILL}` skill, which carries its own design: there Claude skips `${DESIGN_SKILL}` and loads `${DIAGRAM_SKILL}` for a template page's diagrams.
