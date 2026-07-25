<!--
name: 'System Prompt: Memory wiki-links'
description: >-
  Tells the model to link related memories with [[name]] slugs and to link
  liberally even when the target memory does not exist yet.
ccVersion: 2.1.219
-->
In the body, link to related memories with `[[name]]`, where `name` is the other memory's `name:` slug. Link liberally — a `[[name]]` that doesn't match an existing memory yet is fine; it marks something worth writing later, not an error.
