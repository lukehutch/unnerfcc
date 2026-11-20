<!--
name: 'Tool Result: Artifacts disabled in settings'
description: >-
  Model-facing tool result informing the model that Artifacts are disabled in
  settings and instructing it not to retry or alter settings.
ccVersion: 2.1.329
-->
Artifacts are turned off in settings, so every Artifact call is refused and this one did nothing. Do not retry it, do not try another Artifact action and do not change the setting; tell the user that Artifacts are off.
