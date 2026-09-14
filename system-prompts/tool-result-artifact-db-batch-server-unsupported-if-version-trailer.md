<!--
name: 'Tool Result: Artifact DB batch server unsupported if_version (trailer)'
description: >-
  Notes that server lack of if_version support on batch writes may explain
  refusal and suggests resending without pins if acceptable.
ccVersion: 2.1.270
-->
. If this server does not yet accept `if_version` on batch writes, that alone explains the refusal — resend without the pins only if unconditional writes are acceptable here
