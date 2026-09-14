<!--
name: 'Tool Result: Artifact store write via run_script mutation'
description: >-
  Explains how to mutate an artifact store declaring endpoints using run_script
  mode mutation.
ccVersion: 2.1.270
variables:
  - PREFIX
  - TOOL_NAME
  - SUFFIX
-->
${PREFIX}, and no store-write call is served here — the type declares endpoints, so the ${TOOL_NAME} tool's `action: "run_script"` with `mode: "mutation"` can write it (`get_endpoints` first); ${SUFFIX}
