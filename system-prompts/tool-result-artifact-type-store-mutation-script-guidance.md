<!--
name: 'Tool Result: Artifact type store mutation script guidance'
description: >-
  Guidance on writing to an artifact type's store using run_script with mutation
  mode when endpoints are declared.
ccVersion: 2.1.263
-->
This type's instructions fill it through its own store, not with its page or data files, and no store-write call is served here. Only if the type declares endpoints (a handlers.js among the type's files above) can `action: "run_script"` with `mode: "mutation"` write that store through its db globals (`get_endpoints` first), passing `url`: 
