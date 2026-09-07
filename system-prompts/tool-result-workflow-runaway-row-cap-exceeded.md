<!--
name: 'Tool Result: Workflow killed runaway row cap exceeded'
description: >-
  Error message explaining that a workflow run was killed for exceeding the
  per-run row cap due to runaway rules.
ccVersion: 2.1.263
-->
killed (runaway): the run exceeded the per-run row cap — usually a rule putting the fact it fires on. Its facts are readable with read {status:'retracted'}; fix the rule (or split a genuinely larger workload) before launching again.
