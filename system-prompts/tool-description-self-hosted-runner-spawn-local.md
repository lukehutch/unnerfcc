<!--
name: 'Tool Description: Self-hosted runner spawn local'
description: >-
  Describes the tool that spawns a detached self-hosted runner process on the
  local machine, the flags it always passes, and what its return value carries.
ccVersion: 2.1.231
-->
Spawn a self-hosted runner as a detached background process on THIS machine using this binary's `self-hosted-runner` subcommand. Always passes `--base-dir` (the runner's default of /workspace is unwritable on operator laptops) and uses space-separated flags only. Returns {pid, log_path, health_port, command} — `command` is the equivalent shell line for the operator's cheat sheet. This is for the zero→aha proof; production deployment (k8s / docker-compose) is taught, not tooled.
