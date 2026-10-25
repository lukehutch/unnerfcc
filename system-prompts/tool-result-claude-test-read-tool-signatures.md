<!--
name: 'Tool Result: Claude Test read tool call signatures'
description: 'Details valid parameter combinations for reading specs, snapshots, or logs.'
ccVersion: 2.1.310
-->
 Pass { run, key, spec: "<a spec file's stem: home for home.md>" }, { run, key, snapshot: "<the name you saved it under, without .snapshot.md>" } or { run, key, log: true }; "from" asks for a later part, and "find" goes with snapshot.
