<!--
name: 'Tool Result: Workflow resume instructions'
description: >-
  Tells the model how to resume an interrupted workflow by relaunching Workflow
  with scriptPath and resumeFromRunId.
ccVersion: 2.1.270
-->
 To pick up where it left off, relaunch with Workflow({scriptPath, resumeFromRunId}) using the run id from the summary — completed agent() calls return cached.
