<!--
name: 'System Prompt: Task list starting_now log wrapper'
description: >-
  XML tags closing the log and wrapping the step currently starting in
  <starting_now> tags.
ccVersion: 2.1.329
variables:
  - STARTING_STEP
-->

</log>
<starting_now>
${STARTING_STEP}
</starting_now>
