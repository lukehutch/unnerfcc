<!--
name: 'Tool Description: Claude Test read run text'
description: >-
  Describes reading spec files, page snapshots, or run logs in paginated parts
  during a test run.
ccVersion: 2.1.310
variables:
  - PROGRESS_TOOL_NAME
  - SETTINGS_TOOL_NAME
-->
Read text that belongs to this run, one part at a time, and one call at a time. Every call carries the run's key. { run, key, spec: "<stem>" }: a spec file of the project, by its file's stem: "home" for .claude-test/specs/home.md, as the "order" of ${PROGRESS_TOOL_NAME} gives it and as the "file" of each spec in the answer of ${SETTINGS_TOOL_NAME} ends; never the spec's heading. { run, key, snapshot: "<name>" }: a page snapshot that you saved into the run folder with a browser tool's filename, by its file name without .snapshot.md; add find: "<words>" for only the lines that hold those words, each with the two lines before and after it. { run, key, log: true }: the report you wrote. Every answer begins with one line of this tool's own that says which part it holds, of how many, and the "from" to pass for the next part. It works only after the run's save and until its results.json is written. It takes no path.
