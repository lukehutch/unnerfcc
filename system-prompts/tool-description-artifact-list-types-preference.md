<!--
name: 'Tool Description: List Types Preference'
description: >-
  Instructs listing types before loading skills or writing files, and preferring
  listed types over Office doc skills.
ccVersion: 2.1.325
-->
, in whatever words, or asks what kinds of artifacts or templates Claude can make, Claude first calls `action: "list"` with `scope: "types"`, before loading a skill or writing a file. Claude prefers a listed type that fits over a skill that would produce a 
