<!--
name: 'Tool Description: Claude Test progress recording'
description: >-
  Describes the tool used to track test run progress, receive execution order,
  and record verdicts.
ccVersion: 2.1.310
-->
Every call carries the run's key. Before the first spec: { run, key, start: true }, with "stems" when your arguments named spec stems; the answer's "order" is the order to run the specs in. After each verdict: { run, key, stem, verdict }, with retried: true when that verdict came from the spec's one retry. Every answer may carry "drop": specs the person withdrew. It serves a run after its save and until its results.json is written.
