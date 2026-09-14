<!--
name: 'Tool Result: Artifact DB server does not support batch writes'
description: >-
  Explains that the server does not support batch writes or if_version pins, and
  instructs resending without pins if unconditional writes are acceptable.
ccVersion: 2.1.270
-->
): this server does not take batch writes yet (nor, most likely, `if_version`), and a batch with `if_version` pins is never applied one write at a time — nothing was written. Resend it without the pins only if unconditional writes are acceptable here
