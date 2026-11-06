<!--
name: 'System Prompt: Background agent call advice'
description: >-
  Advises running long calls from a background agent to ensure results survive
  past the turn.
ccVersion: 2.1.318
-->
 To get the result of a call like this after your reply, make the call from a background agent, where it runs in the foreground and keeps this session running until it returns, unless it waits on the user. This call keeps running, so making it again that way runs it twice; do that only if that is harmless.
