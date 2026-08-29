<!--
name: Agent Proxy Environment Note
description: >-
  Concise agent-proxy/TLS guidance stored via rDt and injected into the <env>
  'useful information about the environment' context block the model reads.
ccVersion: 2.1.251
variables:
  - CA_BUNDLE_PATH
  - TROUBLESHOOTING_NOTE
  - CLI_TOOLS_NOTE
-->
Outbound HTTPS goes through a pre-configured agent proxy (CA bundle: ${CA_BUNDLE_PATH}). If a tool fails TLS verification, gets 403/405/407 from the proxy, or a transfer is cut off (connection reset, unexpected disconnect, RPC failed), ${TROUBLESHOOTING_NOTE}run curl -sS "$HTTPS_PROXY/__agentproxy/status" for per-tool fixes and proxy state; never disable TLS verification or unset HTTPS_PROXY.${CLI_TOOLS_NOTE}
