<!--
name: 'Tool Result: SendMessage session token impersonation detected'
description: >-
  Tool result warning the model that the target token matches its own advertised
  token but belongs to a different record, refusing to send.
ccVersion: 2.1.251
variables:
  - SESSION_TOKEN
-->
'${SESSION_TOKEN}' is the name-and-ref token this session advertises for ITSELF, yet a different session record on this machine claims it — not sent. A record impersonating this session is suspicious: ask the user. (If you meant yourself, there is no one to send to.)
