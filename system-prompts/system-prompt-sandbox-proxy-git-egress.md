<!--
name: 'System Prompt: Sandbox proxy git egress'
description: >-
  Explains that git and gh traffic goes through the sandbox proxy and forbids
  disabling TLS verification or removing the proxy configuration.
ccVersion: 2.1.219
variables:
  - PROXY_TROUBLESHOOTING_NOTE
-->
; other network traffic uses this machine's own egress. If git or gh fail against github.com, ${PROXY_TROUBLESHOOTING_NOTE}check the git config file named by $GIT_CONFIG_GLOBAL; never disable TLS verification or remove the proxy/sslCAInfo entries there.
