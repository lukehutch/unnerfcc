<!--
name: 'Tool Description: device_bash'
description: >-
  Model-facing description of device_bash — runs a shell command on the user's
  own device rather than the cloud container, with the fresh-shell semantics and
  the sandbox policy that governs it.
ccVersion: 2.1.231
variables:
  - CLOUD_BASH_TOOL_NAME
-->
Run a shell command on the user's local machine (the device running Claude Code), inside Claude Code's OS sandbox. This is NOT the cloud container — the `${CLOUD_BASH_TOOL_NAME}` tool runs there; device_bash runs on the user's device.

cwd is the directory Claude Code was launched in on the device. Each call is a fresh non-interactive shell (bash or zsh, the device user's; no cwd/env carryover between calls); use absolute paths or paths relative to that directory.

Commands run under the device's Claude Code sandbox policy. By default that allows writes only inside the launch directory and a temp dir, reads of most of the filesystem except credential and settings paths, and network access only to allow-listed hosts; operations the sandbox denies fail with "Operation not permitted" or a sandbox note in the output. If the device has sandboxing disabled, every call is refused.

Commands time out after 
