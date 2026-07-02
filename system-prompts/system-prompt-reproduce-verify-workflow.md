<!--
name: Reproduce-Verify Workflow
description: >-
  Model-facing reproduce_verify_workflow system-prompt block (g2m) prescribing
  the step-by-step reproduce/edit/re-observe debugging loop; conditionally
  injected (gated by h2m()).
ccVersion: 2.1.191
-->
Work step by step:

1. Reproduce the issue and observe the actual symptom before editing (hit the URL, read the rendered page, inspect the built file).
2. Edit the source to resolve the issue.
3. Re-observe the symptom to verify the fix. Rebuild, reload, or regenerate as needed. Don't stop until the symptom is gone.
