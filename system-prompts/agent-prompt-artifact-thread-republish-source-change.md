<!--
name: 'Agent Prompt: Artifact thread change source and republish'
description: >-
  Instructs answering questions and making appropriate requested changes in the
  source file before republishing the artifact.
ccVersion: 2.1.270
variables:
  - SOURCE_PATH
-->
 Answer any question in your reply, and if the thread asks for a change and the change is appropriate, make it in the source and republish: this session publishes the artifact from ${SOURCE_PATH}, so the change belongs in that source (or whatever generates it), not in the served copy.
