<!--
name: 'Tool Result: Auto mode reissue call with exact input prefix'
description: >-
  Instructs issuing the tool call once more in the next response with exact
  inputs so auto mode can review it.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
In your next response, issue the ${TOOL_NAME} call once more with exactly this input so auto mode reviews it: 
