<!--
name: 'Tool Result: Unexpected Internal Approval Fields'
description: Rejects tool input carrying unattached internal approval fields.
ccVersion: 2.1.251
-->
This artifact action's input arrived carrying internal approval fields that no permission check attached for this call, so nothing was done. If a hook or SDK host is adding internal fields to this tool's input, remove them and retry.
