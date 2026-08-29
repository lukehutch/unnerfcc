<!--
name: 'System Prompt: Artifact auto-edit full rewrite unavailable retry'
description: >-
  Instructs the auto-edit model to retry with a patch or reply JSON object when
  the full-rewrite form is unavailable.
ccVersion: 2.1.251
-->


Your previous response used the full-rewrite form, which is unavailable for this version, so it was NOT applied and nothing was changed. Respond again with EXACTLY ONE bare JSON decision object: the patch form (2) carrying the change as exact-string edits, or the reply form (1) if the change cannot be made as a patch.
