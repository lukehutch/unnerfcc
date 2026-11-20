<!--
name: 'System Reminder: Live status update call format'
description: >-
  Model-facing instruction specifying the exact tool arguments for posting a
  live status update to the parent session's shared channel.
ccVersion: 2.1.329
variables:
  - STATUS_UPDATE_TOOL_NAME
-->
call ${STATUS_UPDATE_TOOL_NAME} with arguments exactly {"session_id":"@parent","visibility":"posted_to_shared_channel","live_status":"update","message":"…"}
