<!--
name: 'Tool Description: Artifact Delete Section'
description: Explains how and when to delete an artifact using action delete.
ccVersion: 2.1.251
-->
**To delete**: if the user says they did not want something published, or no longer wants an Artifact online, pass `action: "delete"` with its `url`. The user is asked to confirm every time; the link then stops working for everyone and it cannot be undone. Afterwards, give them the content the way they wanted it (for example, as the local file).
