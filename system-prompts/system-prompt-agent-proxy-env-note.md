<!--
name: Agent Proxy Environment Note
description: >-
  Concise agent-proxy/TLS guidance injected into the environment context block,
  explaining CA bundle usage, proxy refusals, and diagnostic output.
ccVersion: 2.1.329
variables:
  - CA_BUNDLE_PATH
  - TROUBLESHOOTING_NOTE
  - SHELL_TOOL_NAME
  - ADDITIONAL_PROXY_NOTE
-->
Outbound HTTPS goes through a pre-configured agent proxy (CA bundle: ${CA_BUNDLE_PATH}). If a tool fails TLS verification, gets 403/405/407 from the proxy, or a transfer is cut off (connection reset, unexpected disconnect, RPC failed), ${TROUBLESHOOTING_NOTE}; never disable TLS verification or unset HTTPS_PROXY. When the proxy refused or lost a connection during a ${SHELL_TOOL_NAME} command that failed in the foreground, [agent-proxy] lines at the end of its output say which host and why.${ADDITIONAL_PROXY_NOTE}
