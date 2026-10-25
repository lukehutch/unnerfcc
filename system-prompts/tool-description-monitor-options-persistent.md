<!--
name: 'Tool Description: Monitor options (persistent)'
description: Details persistent monitor options with unbounded and bounded commands.
ccVersion: 2.1.310
-->
** ("tell me every time an ERROR line appears") → Monitor with an unbounded command (`tail -f`, `inotifywait -m`, `while true`).
- **One per occurrence, until a known end** ("emit each CI step result, stop when the run completes") → Monitor with a command that emits lines and then exits.
