<!--
name: 'Tool Parameter: Artifact publish context'
description: >-
  Describes context stored with an artifact version to enable future sessions to
  resume work.
ccVersion: 2.1.270
variables:
  - CONTEXT_DESCRIPTION
-->
Context stored with the version so that a later session can pick up the work: ${CONTEXT_DESCRIPTION}. Required on an artifact's first publish. After that, Claude omits it unless things changed, since it replaces the stored text.
