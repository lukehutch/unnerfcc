<!--
name: 'Tool Result: One-time job not scheduled on self-hosted runner'
description: >-
  Explains that in-process timers are lost when a self-hosted runner idles and
  directs calling an external wake tool instead.
ccVersion: 2.1.325
-->
Not scheduled. This session runs on a self-hosted runner, which may stop this process while the session is idle. A one-time job kept in this process, durable or not, would then be lost, and nothing would wake the session for it. Instead call 
