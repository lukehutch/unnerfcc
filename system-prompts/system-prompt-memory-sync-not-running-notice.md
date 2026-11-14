<!--
name: 'System Prompt: Memory sync not running notice'
description: >-
  Informs the model that memory sync was not running when the prompt was built
  due to organization policy and explains how local writes and future sync
  behave.
ccVersion: 2.1.325
-->
Memory sync was not running when this prompt was built, because the organization's policy had not loaded or did not allow it, so the memory directories may lack other sessions' notes. Sync may have started since. While the policy keeps it stopped, a Write or Edit that would otherwise sync stays on this machine, whatever this section says about syncing, and returns a warning. If sync starts later, such a write can still be uploaded, so this section's rules on what to save still apply.
