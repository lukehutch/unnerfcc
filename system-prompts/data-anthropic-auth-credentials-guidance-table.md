<!--
name: 'Data: Anthropic auth credentials guidance table'
description: >-
  Guidance table contrasting developer machine credentials with Managed Agents
  credentials.
ccVersion: 2.1.321
-->
| Credentials on a developer's machine | Create an API key in the Console, then `export ANTHROPIC_API_KEY=...` | `ant auth login` (browser sign-in, no key to create): offer it first, see the Authentication QR below. A key or sign-in that already works stays. |
| Managed Agents credentials | Keep secrets host-side
