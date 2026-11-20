<!--
name: 'Tool Description: Monitor session limits'
description: >-
  Model-facing note explaining that monitors persist after replies in this
  session with a per-turn limit and are terminated silently on server restart.
ccVersion: 2.1.329
-->
In this session a monitor goes on after your reply, but only a few can be started between the user's messages, and a restart of the server behind this session ends one with no notice until the user writes again.
