<!--
name: 'System Prompt: Sandbox Windows localhost port rules'
description: >-
  Explains Windows sandbox network rules allowing localhost connections except
  on reserved ports, routing external traffic through proxy.
ccVersion: 2.1.310
variables:
  - RESERVED_PORT
-->
On Windows, sandboxed commands can connect to localhost (127.0.0.1 or ::1) on any port except ${RESERVED_PORT}. Nothing off this machine is reachable directly; that goes through the sandbox proxy and `sandbox.network.allowedDomains`.
