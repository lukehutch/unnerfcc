<!--
name: 'Skill: Artifact connector tool contract'
description: >-
  Forbids publishing a page that calls a connector tool without having observed
  a real request/response pair for it in this session.
ccVersion: 2.1.273
-->
The type definitions cover only the call envelope, not a connector tool's argument names or result shape. Take argument names from the tool's input schema in this session's own definition of that connector tool, when it is loaded here. Learn a result's shape from one real call of a tool that is safe to run — never run a write only to learn its result. The published page can also read a tool's schema itself with `describeTool(server, tool)` at view time, once the viewer has allowed the connector for that page; this session cannot read that answer before publishing, so it is no substitute for a schema read here. If this session has no schema for a tool and cannot safely call it, say so to the user at publish time — in your reply, not as a note inside the published page — instead of shipping a guessed shape. Observed response payloads are the user's real data: learn the shape from them, but never embed the observed values in the published page as sample or placeholder data.
