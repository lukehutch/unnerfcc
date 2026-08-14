<!--
name: 'Tool Description: Self-hosted runner health check'
description: >-
  Describes the typed doctor tool that reads /healthz on the local runner and
  what it returns when health is disabled or nothing is listening.
ccVersion: 2.1.231
-->
GET http://127.0.0.1:{health_port}/healthz on the local runner (2s timeout). Returns the health JSON, or {disabled:true} when health_port is 0, or {unreachable:true,error} when nothing is listening.
