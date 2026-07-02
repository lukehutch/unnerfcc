<!--
name: Context Tip Selector Session Metadata Block
description: >-
  Model-facing session-metadata framing block (hsf) injected into the user
  message sent to the context-tip selector aux model (csf system, gated
  tengu_context_tip).
ccVersion: 2.1.191
variables:
  - DATA_CONTEXT_TIP_SELECTOR_SESSION_METADATA_VAR_0
-->
<session_metadata>
${DATA_CONTEXT_TIP_SELECTOR_SESSION_METADATA_VAR_0.join(`
`)}
</session_metadata>
