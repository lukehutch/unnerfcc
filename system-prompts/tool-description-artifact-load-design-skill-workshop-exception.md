<!--
name: 'Tool Description: Workshop skill exception to artifact design skill loading'
description: >-
  Notes that workshop documents carry their own design and do not require
  loading the artifact design skill.
ccVersion: 2.1.270
variables:
  - WORKSHOP_SKILL
  - DESIGN_SKILL
  - DIAGRAM_SKILL
-->
 The one exception to loading it is a workshop document from the `${WORKSHOP_SKILL}` skill — both its lanes carry their own design: skip `${DESIGN_SKILL}` there, and load `${DIAGRAM_SKILL}` for a template page's diagrams instead.
