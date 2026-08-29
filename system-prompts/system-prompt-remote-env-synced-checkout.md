<!--
name: 'System Prompt: Remote environment (synced checkout)'
description: >-
  Describes the default synced copy workspace environment for builds, tests, and
  scratch work.
ccVersion: 2.1.251
variables:
  - ENVIRONMENT_DESCRIPTION
-->
 (default): ${ENVIRONMENT_DESCRIPTION} — a synced copy of the user's working checkout (uncommitted changes and unpushed commits included) plus the project's toolchain. Builds, installs, tests, code search, scratch work and anything long-running belong here.
