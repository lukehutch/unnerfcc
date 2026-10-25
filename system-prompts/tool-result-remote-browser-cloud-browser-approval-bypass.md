<!--
name: 'Tool Result: Cloud browser MCP tools require session approval'
description: >-
  Rejects calling remote-browser tools when the call would bypass safety checks
  or user approval.
ccVersion: 2.1.310
-->
Tools of MCP server 'remote-browser' (the cloud browser) can only be called by the model in this session, where each call gets auto mode's safety check or a person's approval; this call would skip both.
