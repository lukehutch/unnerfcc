<!--
name: 'Tool Result: Replies return by re-watching, not by resuming'
description: >-
  Denies a resume_replies request because watching the artifact was stopped
  earlier in this session, and points the model at the watch action, after which
  replies return with the next publish.
ccVersion: 2.1.235
-->
Automatic replies are off for this artifact because watching it was stopped earlier in this session — there is no separate auto-reply stop to resume. If the user wants them back, call the watch action for this artifact (which may ask before re-arming the watch); replies return with the next publish after that. Nothing here needs approval.
