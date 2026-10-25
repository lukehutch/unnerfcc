<!--
name: 'Tool Result: Device call refused sandbox weak isolation'
description: >-
  Error returned when device tools are refused due to settings weakening sandbox
  isolation.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
${TOOL_NAME} refused: the sandbox on this device is configured with a setting that weakens its isolation (sandbox.allowAppleEvents, sandbox.allowNestedUserNamespaces, sandbox.enableWeakerNestedSandbox, sandbox.enableWeakerNetworkIsolation, sandbox.network.allowLocalBinding, sandbox.network.allowMachLookup, or a sandbox.ripgrep override outside managed policy settings), so this device serves no device tools. Tell the user; do not retry in a loop.
