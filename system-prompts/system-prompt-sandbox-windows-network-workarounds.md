<!--
name: 'System Prompt: Sandbox Windows network workarounds and local binding'
description: >-
  Explains supported sandbox network behaviors on Windows including external
  browser access, proxy variables, and local binding configuration.
ccVersion: 2.1.310
-->
Two things still work: a server started in the sandbox is reachable from outside it (the user's browser), and a client that honours the proxy environment variables (inside the sandbox they are spelled in lower case, `http_proxy` and `https_proxy`), such as curl, reaches a local port once its host and port are allowed, spelled as in the URL (`"127.0.0.1:3000"` in `sandbox.network.allowedDomains`). Wherever a local address is allowed, keep the port: a bare host opens every local port. Sandboxed commands can be let connect to local ports with `sandbox.network.allowLocalBinding: true` in 
