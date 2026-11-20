<!--
name: 'Tool Result: Workflow resume instructions'
description: >-
  Tells the model how to resume an interrupted workflow by relaunching Workflow
  with scriptPath, resumeFromRunId, and the same args.
ccVersion: 2.1.329
-->
 To pick up where it left off, relaunch with Workflow({scriptPath, resumeFromRunId}) using the run id from the summary and the same args, if it had any — agent() calls return cached results up to the first one that failed, no longer matches or never started.
