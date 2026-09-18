<!--
name: 'Tool Result: Artifact auto_open connector call open'
description: >-
  Instructs passing action open once after the first connector write lands so
  the user sees the filled document.
ccVersion: 2.1.277
-->
The `auto_open`: "after_first_write" you passed cannot wait for this document — it is filled through the connector, not with this tool — so right after your first connector write lands, pass `action: "open"` with this URL once so the user sees it filled.
