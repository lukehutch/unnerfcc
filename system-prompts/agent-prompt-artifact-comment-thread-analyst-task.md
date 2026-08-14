<!--
name: 'Agent Prompt: Artifact comment thread analyst task'
description: >-
  Task line for the comment-thread analyst subagent, naming the artifact and the
  comment that triggered the run.
ccVersion: 2.1.231
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL} (triggering comment id 
