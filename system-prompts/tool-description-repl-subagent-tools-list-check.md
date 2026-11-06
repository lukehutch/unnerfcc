<!--
name: 'Tool Description: REPL subagent tools list check'
description: >-
  Warns subagents to check tools.list() first because unassigned tools will
  throw if called.
ccVersion: 2.1.318
-->
 In a subagent, or a session run as an agent, Tools can list a file or shell tool that agent isn't given; it is missing from tools.list() and calling it throws, so check tools.list() first.
