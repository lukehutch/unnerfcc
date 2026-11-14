<!--
name: 'Tool Result: Git safety scalar run single task'
description: >-
  Model-facing git safety instruction advising running a single scalar
  maintenance task directly instead of background registration.
ccVersion: 2.1.325
variables:
  - ALLOWED_ALTERNATIVES
  - EXTRA_GUIDANCE
-->
Run the single task instead (scalar run fetch, commit-graph, loose-objects or pack-files); ${ALLOWED_ALTERNATIVES}.${EXTRA_GUIDANCE}
