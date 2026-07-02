<!--
name: Context Tip Reception Suggested Action Label
description: >-
  Model-facing label inside the <tip_shown> user-message block sent to the
  context-tip reception evaluator aux model (gated tengu_context_tip, gsf system
  + _sf tool).
ccVersion: 2.1.191
variables:
  - DATA_CONTEXT_TIP_RECEPTION_TIP_SHOWN_WRAPPER_VAR_0
-->
<tip_shown>
Feature: ${DATA_CONTEXT_TIP_RECEPTION_TIP_SHOWN_WRAPPER_VAR_0.tip.featureId}
Tip: ${DATA_CONTEXT_TIP_RECEPTION_TIP_SHOWN_WRAPPER_VAR_0.tip.tip}
Suggested action: ${DATA_CONTEXT_TIP_RECEPTION_TIP_SHOWN_WRAPPER_VAR_0.tip.action??"(none)"}
</tip_shown>
