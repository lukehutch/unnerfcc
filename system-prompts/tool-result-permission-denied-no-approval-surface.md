<!--
name: 'Tool Result: Permission denied no approval surface'
description: >-
  Informs the model that an action requiring approval was automatically denied
  because the session lacks an approval surface.
ccVersion: 2.1.263
variables:
  - ACTION_DESCRIPTION
-->
Permission for this tool use was denied. It requires approval, and this session has no approval surface — nobody can answer a permission prompt here — so it was denied automatically. The action was NOT performed; do not claim it succeeded, and do not retry it: this action, and anything else that requires approval, will be denied the same way for the rest of this session. Tell the user what was blocked and why you needed it, then continue with the parts of the task that do not require approval. What required approval: ${ACTION_DESCRIPTION}
