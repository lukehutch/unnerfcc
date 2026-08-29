<!--
name: 'Tool Parameter: Artifact action — verify'
description: >-
  Describes the artifact action verify parameter for reading runtime browser
  diagnostics captured for an artifact.
ccVersion: 2.1.251
-->
 'verify' reads the runtime diagnostics (console output, uncaught errors, failed resource loads, capability-call outcomes) that viewers' browsers captured for an artifact's current version — pass `url`, or omit it to target this session's most recent publish. An empty result can mean no viewer has loaded the version yet, which is NOT evidence of a clean render.
